import { Router, json } from "express"
import { connect } from "../db/db.js";
import { TesterFnc, getContacts } from "../controllers/controllers.js";


const route = Router()

route.get('/',TesterFnc)

/////
route.get('/api/getContacts',getContacts)


route.post('/api/createContact',async(req,res)=>{
    const { id,idType, nombre,condicionIVA,localidad,domicilio,codigoPostal,correo,celular,telefono1,telefono2,categoria } = req.body;
    try{
        await connect.execute('INSERT INTO contactos (id,idType, nombre,condicionIVA,localidad,domicilio,codigoPostal,correo,celular,telefono1,telefono2) VALUES (?,?,?,?,?,?,?,?,?,?,?)',[id,idType, nombre,condicionIVA,localidad,domicilio,codigoPostal,correo,celular,telefono1,telefono2]);
        if(categoria === "Ambas"){
            await connect.execute('INSERT INTO clientes (contactId) VALUES (?)',[id]);
            await connect.execute('INSERT INTO proveedores (contactId) VALUES (?)',[id]);
            return res.status(200).json({ok:true})
        }else{
            if(categoria === "cliente"){
                await connect.execute('INSERT INTO clientes (contactId) VALUES (?)',[id]);
                return res.status(200).json({ok:true})
            }else if(categoria === "proveedor"){
                await connect.execute('INSERT INTO proveedores (contactId) VALUES (?)',[id]);
                return res.status(200).json({ok:true})
            }
        }
    }catch(err){
        return res.status(400).json({ok:false})
    }
})


route.get('/api/getProducts',async(req,res)=>{
    try{
        const [productos] = await connect.execute('SELECT * FROM productos ORDER BY nombre')
        return res.status(200).json({ok:true,productos})
    }catch(err){
        return res.status(400).json({ok:false})
    }
})


//Crear un nuevo producto
route.post('/api/createProduct',async(req,res)=>{
    const {id,nombre,unidadDeMedida,deposito,cantidad,costoInicial,precioBase,impuesto,precioTotal,fecha,hora} = req.body;
    try{
        await connect.execute('INSERT INTO productos (id,nombre,unidadDeMedida,deposito,cantidad,costoInicial,precioBase,impuesto,precioTotal) VALUES (?,?,?,?,?,?,?,?,?)',[id,nombre,unidadDeMedida,deposito,cantidad,costoInicial,precioBase,impuesto,precioTotal]);
        await connect.execute('INSERT INTO ajustedeinventario (fecha,hora,tipo,cantidad,costoInicial,precioBase,impuesto,precioTotal,idProducto,cantidadAjustada) VALUES (?,?,?,?,?,?,?,?,?,?)',[fecha,hora,"ingreso",cantidad,costoInicial,precioBase,impuesto,precioTotal,id,cantidad]);
        return res.status(200).json({ok:true})
    }catch(err){
        return res.status(400).json({ok:false})
    }
})

function ordenarFechas(arrayDeObjetos) {
    arrayDeObjetos.sort((a, b) => {
      const fechaA = new Date(a.fecha);
      const fechaB = new Date(b.fecha);
  
      return fechaB - fechaA; // Orden descendente, de más reciente a más antigua
    });
  
    return arrayDeObjetos;
}

route.get('/api/producto/:id',async(req,res)=>{
    const id = req.params.id
    try{
        const [ producto ] = await connect.execute('SELECT * FROM productos WHERE id = ?',[id]);
        const [ facturacionProducto ] = await connect.execute('SELECT productosfacturados.cantidad, productosfacturados.precio, "Facturacion de producto" AS tipo, facturasdeventa.fecha FROM facturasdeventa INNER JOIN productosfacturados ON facturasdeventa.id = productosfacturados.idFactura WHERE productosfacturados.idProducto = ?',[id]);
        const [ ajustedDeInventario ] = await connect.execute('SELECT ajustedeinventario.cantidad, ajustedeinventario.precioTotal AS precio, ajustedeinventario.tipo,ajustedeinventario.fecha FROM ajustedeinventario WHERE ajustedeinventario.idProducto = ?',[id])
        const movimientos = ordenarFechas([...facturacionProducto,...ajustedDeInventario])        
        return res.status(200).json({ok:true,producto,movimientos})
    }catch(err){
        return res.status(400).json({ok:false})
    }
})


route.get('/api/getWarehouse',async(req,res)=>{
    try{
       const [depositos] = await connect.execute('SELECT * FROM almacenes ORDER BY nombre');
       return res.status(200).json({ok:true,depositos});
    }catch(err){
        return res.status(400).json({ok:false})
    }
})

route.get('/api/numeracionFacturas',async (req,res)=>{
    try{
        const [ numeracionesFacturas ] = await connect.execute('SELECT * FROM numeracionFacturas');
        return res.status(200).json({ok:true,numeracionesFacturas})
    }catch(err){
        return res.status(400).json({ok:false,message:err})
    }
})

route.post('/api/nuevaFactura',async (req,res)=>{
    const {id,tipo,nmro,contactId,fecha,condicion,plazoDePago,vencimiento,concepto,estado,terminosCondiciones,notas,pie,tipoDePlazo , productosFacturados,nmroFact,total } = req.body;

    try{
        await connect.execute ('INSERT INTO facturasdeventa (id,tipo,nmro,contactId,fecha,condicion,plazoDePago,vencimiento,concepto,estado,terminosCondiciones,notas,pie,tipoDePlazo,total,montoCobrado,montoPendiente) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)',[id,tipo,nmro,contactId,fecha,condicion,plazoDePago,vencimiento,concepto,estado,terminosCondiciones,notas,pie,tipoDePlazo,total,0,total])
        
        productosFacturados.forEach(async(element) => {
            await connect.execute('INSERT INTO productosfacturados (idFactura,idProducto,cantidad,precio,bonificacion,impuesto,descripcion,costo) VALUES (?,?,?,?,?,?,?,?)',[ element.idFactura,element.idProducto,element.cantidad,element.precio,element.bonificacion,element.impuesto,element.descripcion,element.costo ])
            
            await connect.execute(`UPDATE productos SET cantidad = ${element.productoCantidadAcualizada} WHERE id = "${element.idProducto}"`)
        });

        await connect.execute(`UPDATE numeracionfacturas SET ${tipo} = "${nmroFact}" WHERE id = "1"`);
        
        return res.status(201).json({ok:true})
    }catch(err){
        console.log(err)
        return res.status(400).json({ok:false})
    }
})

route.get('/api/getFacturas',async(req,res)=>{
    try{
        const [ facturas ] = await connect.execute(
            `
            SELECT facturasdeventa.id AS idFactura, facturasdeventa.tipo, facturasdeventa.nmro, facturasdeventa.contactId, facturasdeventa.fecha, facturasdeventa.condicion, facturasdeventa.plazoDePago, facturasdeventa.vencimiento, facturasdeventa.concepto, facturasdeventa.estado, facturasdeventa.terminosCondiciones, facturasdeventa.notas, facturasdeventa.pie, facturasdeventa.tipoDePlazo, facturasdeventa.total, facturasdeventa.montoCobrado, facturasdeventa.montoPendiente,
            contactos.id, contactos.idType, contactos.nombre, contactos.condicionIVA, contactos.localidad, contactos.domicilio, contactos.codigoPostal, contactos.correo, contactos.celular, contactos.telefono1, contactos.telefono2
            FROM facturasdeventa
            INNER JOIN contactos ON contactos.id = facturasdeventa.contactId
            ORDER BY fecha DESC`)
        return res.status(200).json({ok:true,facturas})
    }catch(err){
        return res.status(400).json({ok:false})
    }
})


route.get('/api/detalleFactura/:id',async(req,res)=>{
    const id = req.params.id;
    try{
        const [ factura ] = await connect.execute('SELECT * FROM facturasdeventa WHERE id = ?',[id])
        const [ productos ] = await connect.execute('SELECT productosfacturados.cantidad,productosfacturados.precio, productosfacturados.bonificacion, productosfacturados.impuesto,productos.nombre,productos.id FROM productosfacturados INNER JOIN productos ON  productosfacturados.idProducto = productos.id WHERE idFactura = ?',[id])
        const [ cliente ] = await connect.execute('SELECT  contactos.condicionIVA,contactos.nombre, contactos.id,contactos.idType,contactos.localidad,contactos.domicilio,contactos.codigoPostal,contactos.correo,contactos.celular,contactos.telefono1,contactos.telefono2 FROM facturasdeventa INNER JOIN contactos ON  facturasdeventa.contactId = contactos.id WHERE facturasdeventa.id = ?',[id])
        return res.status(200).json({ok:true,factura,productos,cliente})
    }catch(err){
        return res.status(400).json({ok:false})
    }
})


route.get('/api/facturaDetail/:id',async(req,res)=>{
    try{
        const [ factura ] = await connect.execute('SELECT * FROM facturasdeventa WHERE id = ?',[id])
        const [ productos ] = await connect.execute('SELECT productosfacturados.cantidad,productosfacturados.precio, productosfacturados.bonificacion, productosfacturados.impuesto,productos.nombre,productos.id FROM productosfacturados INNER JOIN productos ON  productosfacturados.idProducto = productos.id WHERE idFactura = ?',[id])
        const [ cliente ] = await connect.execute('SELECT  contactos.condicionIVA,contactos.nombre, contactos.id,contactos.idType,contactos.localidad,contactos.domicilio,contactos.codigoPostal,contactos.correo,contactos.celular,contactos.telefono1,contactos.telefono2 FROM facturasdeventa INNER JOIN contactos ON  facturasdeventa.contactId = contactos.id WHERE facturasdeventa.id = ?',[id])

        return res.status(200).json({ok:true,factura,productos,cliente})
    }catch(err){
        return res.status(400).json({ok:false})
    }
})


route.get('/api/getFacturasTest',async(req,res)=>{
    try{
        const [ facturas ] = await connect.execute('SELECT * FROM facturasdeventa INNER JOIN contactos WHERE contactos.id = facturasdeventa.contactId')
        return res.status(200).json({ok:true,facturas})
    }catch(err){
        return res.status(400).json({ok:false})
    }
})



route.get('/api/ajustesDeInventario',async(req,res)=>{
    try{
        const [ ajustes ] = await connect.execute('SELECT ajustedeinventario.fecha,ajustedeinventario.hora,ajustedeinventario.tipo,ajustedeinventario.cantidad,ajustedeinventario.costoInicial,ajustedeinventario.precioBase,ajustedeinventario.impuesto,ajustedeinventario.impuesto,ajustedeinventario.precioTotal,ajustedeinventario.idProducto,ajustedeinventario.cantidadAjustada,productos.nombre,productos.unidadDeMedida FROM ajustedeinventario INNER JOIN productos WHERE productos.id = ajustedeinventario.idProducto ORDER BY fecha DESC, hora DESC');
        return res.status(200).json({ok:true,ajustes})
    }catch(err){
        return res.status(400).json({ok:false,message:err})
    }
})


route.post('/api/ajusteDeInventario',async(req,res)=>{
    const {productosAjustados} = req.body;

    try{
        productosAjustados.forEach(async(element) => {
            await connect.execute('INSERT INTO ajustedeinventario (fecha,hora,tipo,cantidad,costoInicial,precioBase,impuesto,precioTotal,idProducto,cantidadAjustada) VALUES (?,?,?,?,?,?,?,?,?,?)',[element.fecha,element.hora,element.tipoDeAjuste,element.cantidad,element.costoInicial,element.precioBase, element.impuesto, element.precioTotal,element.id,element.cantidadAjustada]);
            await connect.execute(`
                UPDATE productos 
                SET cantidad = ${element.cantidad} , costoInicial = ${element.costoInicial} , precioBase = ${element.precioBase}, impuesto = ${element.impuesto}, precioTotal = ${element.precioTotal} 
                WHERE id = "${element.id}";
            `)
        });
        return res.status(201).json({ok:true})
    }catch(err){
        console.log(err)
        return res.status(400).json({ok:false})
    }
})

route.get('/api/vendedores',async(req,res)=>{
    try{
        const [vendedores] = await connect.execute('SELECT * FROM vendedores');
        return res.status(200).json({ok:true,vendedores})
    }catch(err){
        return res.status(400).json({ok:false})
    }
})

route.get('/api/remitos',async(req,res)=>{
    try{
        const [ remitos ] = await connect.execute('SELECT remitos.id AS idRemito, contactos.nombre, remitos.creacion, remitos.vencimiento, remitos.estado, remitos.concepto, remitos.total, contactos.id FROM remitos INNER JOIN contactos WHERE contactos.id = remitos.contactId ORDER BY creacion DESC')
        return res.status(200).json({ok:true,remitos})
    }catch(err){
        return res.status(400).json({ok:false})
    }
})

route.get('/api/remitosAsociados/:id',async(req,res)=>{
    const param = req.params.id;
    try{
        const [ remitosAsociados ] = await connect.execute(`SELECT * FROM remitos WHERE contactId = "${param}"`);
        return res.status(200).json({ok:true,remitosAsociados})
    }catch{
        return res.status(400).json({ok:false})
    }
})

route.get('/api/detalleRemitoFacturar/:id',async(req,res)=>{
    const param = req.params.id;
    try{
        const [ contacto ] = await connect.execute('SELECT contactos.id,contactos.idType,contactos.nombre,contactos.condicionIVA,contactos.localidad,contactos.domicilio,contactos.codigoPostal,contactos.correo,contactos.celular,contactos.telefono1,contactos.telefono2 FROM remitos INNER JOIN contactos ON remitos.contactId = contactos.id WHERE remitos.id = ?',[param])
        const [productos] = await connect.execute('SELECT productos.nombre,productos.id, productos.cantidad AS stock,productosremito.cantidad, productosremito.precio AS precioTotal ,productosremito.bonificacion AS bonif,productosremito.impuesto AS IVA, productos.costoInicial FROM productos INNER JOIN productosremito ON productos.id = productosremito.idProducto WHERE productosremito.idRemito = ?',[param])
        return res.status(200).json({ok:true,contacto,productos})

    }catch(err){
        return res.status(400).json({ok:false})
    }
})

route.get('/api/detalleRemito/:id',async(req,res)=>{
    const id = req.params.id;
    try{
        const [ remito ] = await connect.execute('SELECT * FROM remitos WHERE id = ?',[id])
        const [ productos ] = await connect.execute('SELECT productosremito.cantidad,productosremito.precio, productosremito.bonificacion, productosremito.impuesto,productos.nombre,productos.id FROM productosremito INNER JOIN productos ON  productosremito.idProducto = productos.id WHERE idRemito = ?',[id])
        const [ cliente ] = await connect.execute('SELECT  contactos.condicionIVA,contactos.nombre, contactos.id,contactos.idType,contactos.localidad,contactos.domicilio,contactos.codigoPostal,contactos.correo,contactos.celular,contactos.telefono1,contactos.telefono2 FROM remitos INNER JOIN contactos ON  remitos.contactId = contactos.id WHERE remitos.id = ?',[id]);
        const [ detalleFactura ] = await connect.execute('SELECT facturasdeventa.condicion, facturasdeventa.tipo AS tipoFactura,facturasdeventa.nmro AS nmroDeFactura FROM asociacionfacturaremito INNER JOIN facturasdeventa ON asociacionfacturaremito.idFactura = facturasdeventa.id WHERE asociacionfacturaremito.idRemito =  ?',[id])
        return res.status(200).json({ok:true,remito,productos,cliente,detalleFactura})
    }catch(err){
        console.log(err)
        return res.status(400).json({ok:false})
    }
})

route.post('/api/asociarRemitoFactura',async(req,res)=>{
    const {idFactura,idRemito} = req.body;
    try{
        await connect.execute('SET FOREIGN_KEY_CHECKS = 0');

        // Insertar en la tabla asociacionfacturaremito
        await connect.execute('INSERT INTO asociacionfacturaremito (idFactura, idRemito) VALUES (?, ?)', [idFactura, idRemito]);

        // Actualizar el estado en la tabla remitos
        await connect.execute(`UPDATE remitos SET estado = "Facturado" WHERE id = ?`,[idRemito]);
        
        // Activar restricciones de clave externa
        await connect.execute('SET FOREIGN_KEY_CHECKS = 1');


        return res.status(200).json({ok:true})
    }catch(err){
        console.log(err)
        return res.status(400).json({ok:false})
    }
})



route.post('/api/nuevoRemito',async(req,res)=>{
    const { almacenId,concepto,contactId,creacion,direccion,id,total,vencimiento,vendedorId,productos} = req.body;
    try{
        await connect.execute('INSERT INTO remitos (id,vendedorId,contactId,creacion,vencimiento,concepto,almacenId,total,direccion,estado) VALUES (?,?,?,?,?,?,?,?,?,?)',[id,vendedorId,contactId,creacion,vencimiento,concepto,almacenId,total,direccion,"No facturado"]);
        productos.forEach(async(element) => {
            await connect.execute('INSERT INTO productosremito (idRemito,idProducto,cantidad,precio,bonificacion,impuesto,descripcion) VALUES (?,?,?,?,?,?,?)',[
                element.idRemito,
                element.idProducto,
                element.cantidad,
                element.precio,
                element.bonificacion,
                element.impuesto,
                element.descripcion,
            ])
        });
        
        return res.status(201).json({ok:true})
    }catch(err){
        return res.status(400).json({ok:false})
    }
})


route.get('/api/cobranzas',async(req,res)=>{
    try{
        const [ cobranzas ] = await connect.execute(`
        SELECT cobranzas.id AS idCobranza, cobranzas.total, cobranzas.fecha, cobranzas.metodoDePago, cobranzas.concepto, cobranzas.valor, cobranzas.impuesto, cobranzas.cantidad, cobranzas.observaciones, cobranzas.notas, bancos.nmroDeCuenta, bancos.entidad, bancos.tipo 
        FROM cobranzas INNER JOIN bancos WHERE cobranzas.ctaBancaria = bancos.id 
        ORDER BY fecha DESC`);
        return res.status(200).json({ok:true,cobranzas})
    }catch(err){
        return res.status(400).json({ok:false})
    }
})

route.post('/api/cobranzas',async(req,res)=>{
    const { id,total,fecha,metodoDePago,ctaBancaria,concepto,valor,impuesto,cantidad,observaciones,notas,idFactura } = req.body;
    try{
        await connect.execute('INSERT INTO cobranzas (id,total,fecha,metodoDePago,ctaBancaria,concepto,valor,impuesto,cantidad,observaciones,notas) VALUES (?,?,?,?,?,?,?,?,?,?,?)',[id,total,fecha,metodoDePago,ctaBancaria,concepto,valor,impuesto,cantidad,observaciones,notas])
        if(concepto === "cobro de factura de venta"){
            await connect.execute('INSERT INTO cobranzasporfactura (idCobranza,idFactura) VALUES (?,?)',[id,idFactura])
            await connect.execute(`
                UPDATE facturasdeventa 
                SET estado = "Pagada", 
                montoCobrado = ${total},
                montoPendiente = montoPendiente - ${total} 
                WHERE id = "${idFactura}"
            `)
            await connect.execute(`UPDATE bancos SET saldo = saldo + ${total} WHERE id = "${ctaBancaria}"`)            
        }
        return res.status(200).json({ok:true})
    }catch(err){
        console.log(err)
        return res.status(400).json({ok:false})
    }
})


route.get('/api/bancos',async(req,res)=>{
    try{
        const [ bancos ] = await connect.execute('SELECT * FROM bancos')
        return res.status(200).json({ok:true,bancos})
    }catch(err){
        return res.status(400).json({ok:false})
    }
})

route.get('/api/balance',async(req,res)=>{
    try{
        const [ ingresos ] = await connect.execute('SELECT SUM(total) AS ingresos FROM cobranzas;')
        const [ gastos ] = await connect.execute('SELECT SUM(total) AS gastos FROM pagos;')

        const [ gananciasPorFacturas ] = await connect.execute(`
        
            SELECT
            idProducto,
            idFactura,
            cantidad,
            bonificacion as bonif,
            precio as precioDeVenta,
            costo, 
            (precio*cantidad) AS subtotal, 
            ((precio*cantidad)*bonificacion/100) as descuento, 
            ((precio*cantidad)-((precio*cantidad)*bonificacion/100)) as total, 
            (((precio*cantidad)-((precio*cantidad)*bonificacion/100)) / cantidad) as precioPorProducto, 
            ((((precio*cantidad)-((precio*cantidad)*bonificacion/100)) / cantidad) - costo) as gananciaNeta
            FROM productosfacturados;
        `)
        return res.status(200).json({ok:true,ingresos:ingresos[0].ingresos,gastos:gastos[0].gastos,gananciasPorFacturas})
    }catch(err){
        return res.status(400).json({ok:false})
    }
})


route.get('/api/capital',async(req,res)=>{
    try{
        const [ capital ] = await connect.execute('SELECT * FROM capital ORDER BY fecha DESC');
        const [ inversion ] = await connect.execute('SELECT SUM(monto) AS inversion FROM capital;')
        
        return res.status(200).json({ok:true,capital,inversion:inversion[0].inversion})
    }catch(err){
        return res.status(400).json({ok:false})
    }
})

///////////////// FACTURAS DE PROVEEDORES
route.get('/api/facturasdeproveedores',async(req,res)=>{
    try{
        const [facturas] = await connect.execute(`
        SELECT facturasdeproveedores.id as idFactura,facturasdeproveedores.tipo, facturasdeproveedores.nmro, facturasdeproveedores.contactId, facturasdeproveedores.fecha, facturasdeproveedores.condicion, facturasdeproveedores.plazoDePago, facturasdeproveedores.vencimiento, facturasdeproveedores.concepto, facturasdeproveedores.estado, facturasdeproveedores.terminosCondiciones, facturasdeproveedores.notas, facturasdeproveedores.pie, facturasdeproveedores.tipoDePlazo, facturasdeproveedores.total, facturasdeproveedores.montoPagado, facturasdeproveedores.montoPendiente,
        contactos.id, contactos.idType, contactos.nombre, contactos.condicionIVA, contactos.localidad, contactos.domicilio, contactos.codigoPostal, contactos.correo, contactos.celular, contactos.telefono1, contactos.telefono2
        FROM facturasdeproveedores
        INNER JOIN contactos ON contactos.id = facturasdeproveedores.contactId
        ORDER BY fecha DESC;
        `)
        return res.status(200).json({ok:true,facturas})
    }catch(err){
        return res.status(400).json({ok:false})
    }
})



route.post('/api/facturasdeproveedores',async(req,res)=>{
    const {id,nmro,tipo,contactId,fecha,condicion,plazoDePago,vencimiento,concepto,estado,tipoDePlazo,total,montoPagado,montoPendiente,items} = req.body;
    try{
        await connect.execute('INSERT INTO facturasdeproveedores (id,nmro,tipo,contactId,fecha,condicion,plazoDePago,vencimiento,concepto,estado,tipoDePlazo,total,montoPagado,montoPendiente) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)',[id,nmro,tipo,contactId,fecha,condicion,plazoDePago,vencimiento,concepto,estado,tipoDePlazo,total,montoPagado,montoPendiente]);
        items.forEach(async(element) => {
            await connect.execute('INSERT INTO itemsfp (idFactura,detalle,precio,cantidad,impuesto,bonificacion) VALUES (?,?,?,?,?,?)',[id,element.detalle,parseFloat(element.precio),parseInt(element.cantidad),element.impuesto,parseFloat(element.descuento)])
        });
        return res.status(200).json({ok:true})
    }catch(err){
        return res.status(400).json({ok:fasle})
    }
})

route.post('/api/pagos',async(req,res)=>{
    const { id,total,fecha,metodoDePago,ctaBancaria,concepto,valor,impuesto,cantidad,observaciones,idFactura } = req.body;
    try{
        await connect.execute('INSERT INTO pagos (id,total,fecha,metodoDePago,ctaBancaria,concepto,valor,impuesto,cantidad,observaciones) VALUES (?,?,?,?,?,?,?,?,?,?)',[id,total,fecha,metodoDePago,ctaBancaria,concepto,valor,impuesto,cantidad,observaciones])
        if(concepto === "pago de factura de proveedores"){
            await connect.execute('INSERT INTO pagosporfactura (idPago,idFactura) VALUES (?,?)',[id,idFactura])
            await connect.execute(`
                UPDATE facturasdeproveedores 
                SET estado = "Pagada", 
                montoPagado = ${total},
                montoPendiente = montoPendiente - ${total} 
                WHERE id = "${idFactura}"
            `)
            await connect.execute(`UPDATE bancos SET saldo = saldo - ${total} WHERE id = "${ctaBancaria}"`)            
        }
        return res.status(200).json({ok:true})
    }catch(err){
        console.log(err)
        return res.status(400).json({ok:false})
    }
})

route.get('/api/pagos',async(req,res)=>{
    try{
        const [ pagos ] = await connect.execute(`
        SELECT pagos.id AS idPago, pagos.total, pagos.fecha, pagos.metodoDePago, pagos.concepto, pagos.valor, pagos.impuesto, pagos.cantidad, pagos.observaciones, bancos.nmroDeCuenta, bancos.entidad, bancos.tipo 
        FROM pagos INNER JOIN bancos WHERE pagos.ctaBancaria = bancos.id 
        ORDER BY fecha DESC`);
        return res.status(200).json({ok:true,pagos})
    }catch(err){
        console.log(err)
        return res.status(400).json({ok:false})
    }
})






route.get('/api/libroDiario/:fechaInicio/:fechaFinal',async(req,res)=>{
    console.log(req.params.fechaInicio)
    console.log(req.params.fechaFinal)
    try{
        
        const [ resFacturasVenta ] = await connect.execute(`SELECT id FROM facturasdeventa WHERE fecha BETWEEN '${req.params.fechaInicio}' AND '${req.params.fechaFinal}' ORDER BY fecha ASC`)
        const [ resFacturasdeProveedores ] = await connect.execute(`SELECT id FROM facturasdeproveedores WHERE fecha BETWEEN '${req.params.fechaInicio}' AND '${req.params.fechaFinal}' ORDER BY fecha ASC`)
        /*Pagos por factura: inner join:
            DEVUELVE ESTO:
            {
                entidadBancaria,
                tipoDeCtaBancaria,
                monto,
                fecha,
                concepto (deposito, transferencia,etc),
                categoria (pago de factura de proveedores),
            }
        */
        const [ resPagosFP ] = await connect.execute(`SELECT bancos.entidad AS entidadBancaria, bancos.tipo AS tipoDeCtaBancaria, pagos.total AS monto, pagos.fecha, pagos.metodoDePago AS concepto, pagos.concepto AS categoria 
        FROM pagos INNER JOIN bancos ON pagos.ctaBancaria = bancos.id WHERE concepto = "pago de factura de proveedores" AND fecha BETWEEN '${req.params.fechaInicio}' AND '${req.params.fechaFinal}' ORDER BY fecha ASC`)
        
        /*
        Pagos no asociados a factura: busqueda exceptuando el concepto "pago de factura de proveedores"
        {
            categoria,
            total,
            fecha,
            concepto,
            bonificacion,
            iva,
            entidadBancaria,
            tipoDeCtaBancaria
        }
        */
        const [ resPagosAcr ] = await connect.execute(`SELECT "pago a acreedores varios" AS categoria,pagos.total,pagos.fecha,pagos.concepto,(pagos.valor * (pagos.bonificacion/100)) AS bonificacion,(pagos.valor * (pagos.impuesto/100)) AS iva, bancos.entidad AS entidadBancaria, bancos.tipo AS tipoDeCtaBancaria FROM pagos INNER JOIN bancos ON pagos.ctaBancaria = bancos.id WHERE pagos.concepto != "pago de factura de proveedores" AND pagos.fecha BETWEEN '${req.params.fechaInicio}' AND '${req.params.fechaFinal}' ORDER BY fecha ASC`)
        
        /*
        Cobranzas asociadas a facturas de venta:

        */
        const [resCobranzasFV] = await connect.execute(`SELECT bancos.entidad AS entidadBancaria, bancos.tipo AS tipoDeCtaBancaria, cobranzas.total AS monto, cobranzas.fecha, cobranzas.metodoDePago AS concepto, cobranzas.concepto AS categoria
        FROM cobranzas INNER JOIN bancos ON cobranzas.ctaBancaria = bancos.id WHERE concepto = "cobro de factura de venta" AND fecha BETWEEN '${req.params.fechaInicio}' AND '${req.params.fechaFinal}' ORDER BY fecha ASC;`)

        const rdosFv = [];
        const rdosFP = [];

        for (const element of resFacturasVenta) {
            const [data] = await connect.execute(`
                SELECT facturasdeventa.fecha, facturasdeventa.condicion, "factura de venta" AS categoria,
                (facturasdeventa.total - SUM((productosfacturados.precio * productosfacturados.cantidad) * (productosfacturados.bonificacion / 100))) AS deudoresPorVenta,
                facturasdeventa.nmro AS nmroFact, facturasdeventa.tipo AS tipoFact,
                SUM(productosFacturados.costo * productosFacturados.cantidad) AS costoMercaderia,
                (facturasdeventa.total - SUM(((productosfacturados.precio * productosfacturados.cantidad) - ((productosfacturados.precio * productosfacturados.cantidad) * (productosfacturados.bonificacion / 100))) * (productosfacturados.impuesto / 100))) AS ventas,
                SUM(productosfacturados.precio * productosfacturados.cantidad) AS importeNetoGravado,
                SUM((productosfacturados.precio * productosfacturados.cantidad) * (productosfacturados.bonificacion / 100)) AS bonificacion,
                SUM(((productosfacturados.precio * productosfacturados.cantidad) - ((productosfacturados.precio * productosfacturados.cantidad) * (productosfacturados.bonificacion / 100))) * (productosfacturados.impuesto / 100)) AS iva
                FROM facturasdeventa
                INNER JOIN productosfacturados ON facturasdeventa.id = productosfacturados.idFactura
                WHERE facturasdeventa.id = '${element.id}'
            `);
            rdosFv.push(data[0]);
        }
        for (const element of resFacturasdeProveedores) {
            const [data] = await connect.execute(`
            SELECT
            facturasdeproveedores.fecha, facturasdeproveedores.nmro AS nmroFact, facturasdeproveedores.tipo AS tipoFact, "facturas de proveedores" AS categoria, 
            facturasdeproveedores.concepto, facturasdeproveedores.total, 
            SUM((itemsfp.precio * itemsfp.cantidad) * (itemsfp.bonificacion / 100)) AS bonificacion, 
            SUM(((itemsfp.precio * itemsfp.cantidad) - ((itemsfp.precio * itemsfp.cantidad) * (itemsfp.bonificacion / 100))) * (itemsfp.impuesto / 100)) AS iva,
            (facturasdeproveedores.total - SUM((itemsfp.precio * itemsfp.cantidad) * (itemsfp.bonificacion / 100))) AS proveedores
            FROM facturasdeproveedores INNER JOIN itemsfp ON facturasdeproveedores.id = itemsfp.idFactura WHERE facturasdeproveedores.id = '${element.id}'
            `);
            rdosFP.push(data[0]);
        }
        /*
        for (const element of resFacturasdeProveedores) {
            const [data] = await connect.execute(`
            SELECT
            facturasdeproveedores.fecha, facturasdeproveedores.nmro AS nmroFact, facturasdeproveedores.tipo AS tipoFact, "facturas de proveedores" AS categoria, 
            facturasdeproveedores.concepto, facturasdeproveedores.total, 
            SUM((itemsfp.precio * itemsfp.cantidad) * (itemsfp.bonificacion / 100)) AS bonificacion, 
            SUM(((itemsfp.precio * itemsfp.cantidad) - ((itemsfp.precio * itemsfp.cantidad) * (itemsfp.bonificacion / 100))) * (itemsfp.impuesto / 100)) AS iva,
            (facturasdeproveedores.total - SUM((itemsfp.precio * itemsfp.cantidad) * (itemsfp.bonificacion / 100))) AS proveedores
            FROM facturasdeproveedores INNER JOIN itemsfp ON facturasdeproveedores.id = itemsfp.idFactura WHERE facturasdeproveedores.id = '${element.id}'
            `);
            rdosFP.push(data[0]);
        }

        
        */


        let rdosContables = ordenarFechas([...rdosFP,...rdosFv,...resPagosFP,...resPagosAcr,...resCobranzasFV])
        rdosContables.reverse()

        return res.status(200).json({ ok: true,rdosContables });
    }catch(err){
        return res.status(400).json({ok:false,message:err})
    }
})


route.post('/api/libroDiario',async(req,res)=>{
    const { id,fechaInicial,fechaFinal } = req.body;
    try{
        await connect.execute('INSERT INTO libroDiario (id,fechaInicial,fechaFinal) VALUES (?,?,?)',[id,fechaInicial,fechaFinal])
        return res.status(201).json({ok:true})
    }catch(err){
        return res.status(400).json({ok:false,message:err})
    }
})


route.get('/api/libro-diario',async(req,res)=>{
    try{
        const [ librosDiarios ] = await connect.execute('SELECT * FROM libroDiario')
        return res.status(200).json({ok:true,librosDiarios})
    }catch(err){
        return res.status(400).json({ok:false})
    }
})


route.get('/api/libro-diario/:id',async(req,res)=>{
    try{
        const [ libro ] = await connect.execute('SELECT * FROM libroDiario WHERE id = ?',[req.params.id])
        return res.status(200).json({ok:true,libro})
    }catch(err){
        return res.status(400).json({ok:false})
    }
})

export default route