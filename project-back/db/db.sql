/*
ajustedeinventario
almacenes
asociacionfacturadeventayrecurrente
asociacionfacturaremito
bancos
clientes
cobranzas
cobranzasporfactura
contactos
facturasdeproveedores
facturasdeventa
facturasrecurrentes
itemsfp
itemsinventariablesfp
notasdecredito
numeracionfacturas
productos
productosfacturados
productosremito
proveedores
remitos
vendedores
*/

/*

SELECT
idProducto,
idFactura,
cantidad,
bonificacion as `bonif%`,
precio as precioDeVenta,
costo, 
(precio*cantidad) AS subtotal, 
((precio*cantidad)*bonificacion/100) as descuento, 
((precio*cantidad)-((precio*cantidad)*bonificacion/100)) as total, 
(((precio*cantidad)-((precio*cantidad)*bonificacion/100)) / cantidad) as precioPorProducto, 
((((precio*cantidad)-((precio*cantidad)*bonificacion/100)) / cantidad) - costo) as gananciaNeta
FROM productosfacturados;

SELECT
idProducto,
idFactura, 
(precio*cantidad) AS subtotal, 
((precio*cantidad)*bonificacion/100) as descuento, 
((precio*cantidad)-((precio*cantidad)*bonificacion/100)) as total, 
(((precio*cantidad)-((precio*cantidad)*bonificacion/100)) / cantidad) as precioPorProducto, 
((((precio*cantidad)-((precio*cantidad)*bonificacion/100)) / cantidad) - costo) as gananciaNeta
FROM productosfacturados;

SELECT SUM(mi_columna) AS suma_total FROM mi_tabla;

SELECT SUM(precio*cantidad) AS suma_total FROM itemsfp;


SELECT SUM(cobranzas.total) + SUM(capital.monto) - SUM(pagos.total) AS total
FROM cobranzas, capital,pagos;

UPDATE tabla1
SET columna_actualizar = (
    SELECT SUM(columna_suma) FROM tabla2
);

UPDATE bancos
SET saldo = (
    SELECT SUM(total) FROM cobranzas
)
WHERE id = "1"
;

{
  "id":"42062851","idType":"DNI","nombre":"Agostina Alvarez","condicionIVA" : "responsable inscripto","localidad":"Mendoza - Guyamallen","domicilio":"cadetes chilenos 2448","codigoPostal" : "5503","correo" : "agosalvarezz199@gmail.com","celular" : "2615658886","telefono1":null,"telefono2": null
}



UPDATE ajustedeinventario 
SET fecha = "2023-01-04" ,hora = "09:18:34" 
WHERE idProducto = "dc4992e6-8f3f-4b6c-afda-dd1724c21343";


ALTER TABLE ajustedeinventario
MODIFY COLUMN impuesto FLOAT;


SET FOREIGN_KEY_CHECKS = 0

SET FOREIGN_KEY_CHECKS = 0
*/

CREATE TABLE pedidos (
    id_pedido INT PRIMARY KEY,
    fecha_pedido DATE,
    id_cliente INT,
    FOREIGN KEY (id_cliente) REFERENCES clientes(id_cliente)
);


CREATE TABLE productos (
  id VARCHAR (40) NOT NULL PRIMARY KEY,
  nombre VARCHAR(255) NOT NULL,
  unidadDeMedida VARCHAR(20) NOT NULL,
  deposito VARCHAR (255),
  cantidad INT NOT NULL,
  costoInicial FLOAT,
  precioBase FLOAT NOT NULL,
  impuesto INT,
  precioTotal INT NOT NULL
)

CREATE TABLE facturasDeVenta (
  id VARCHAR (200) NOT NULL PRIMARY KEY,
  tipo VARCHAR(1) NOT NULL,
  nmro VARCHAR(200) NOT NULL,
  contactId VARCHAR(30) NOT NULL,
  fecha DATE NOT NULL,
  condicion VARCHAR (20),
  plazoDePago INT NOT NULL,
  vencimiento DATE NOT NULL,
  concepto VARCHAR(25),
  estado VARCHAR(10),
  terminosCondiciones TEXT,
  notas VARCHAR(300),
  pie VARCHAR(300),
  FOREIGN KEY (contactId) REFERENCES contactos(id),
);


CREATE TABLE productosFacturados (
  idFactura VARCHAR(200) NOT NULL,
  idProducto VARCHAR (40) NOT NULL,
  cantidad INT NOT NULL,
  precio FLOAT NOT NULL,
  bonificacion FLOAT,
  impuesto FLOAT,
  descripcion VARCHAR(255),
  FOREIGN KEY (idFactura) REFERENCES facturasDeVenta(id),
  FOREIGN KEY (idProducto) REFERENCES productos(id)
);


CREATE TABLE facturasRecurrentes(
  id VARCHAR(40) NOT NULL PRIMARY KEY,
  tipo VARCHAR(1) NOT NULL,
  observaciones TEXT,
  notas VARCHAR(300),
  inicio DATE NOT NULL,
  finalizacion DATE NOT NULL,
  plazo INT NOT NULL,
  contactId VARCHAR(30) NOT NULL,
  frecuencia INT NOT NULL,
  FOREIGN KEY (contactId) REFERENCES contactos(id)
);

CREATE TABLE asociacionFacturaDeVentaYRecurrente(
  idFactura VARCHAR (200) NOT NULL,
  idFacturaR VARCHAR(40) NOT NULL,
  FOREIGN KEY(idFactura) REFERENCES facturasDeVenta(id),
  FOREIGN KEY (idFacturaR) REFERENCES facturasRecurrentes(id)
)


CREATE TABLE AsociacionFacturaRemito (
  idFactura VARCHAR (200) NOT NULL,
  idRemito VARCHAR(200) NOT NULL,
  FOREIGN KEY (idFactura) REFERENCES facturasDeVenta(id),
  FOREIGN KEY (idRemito) REFERENCES remitos(id)
)


CREATE TABLE remitos (
  id VARCHAR(200) NOT NULL PRIMARY KEY,
  vendedorId VARCHAR(30) NOT NULL,
  tipo VARCHAR(20) NOT NULL,
  contactId VARCHAR(30) NOT NULL,
  creacion DATE NOT NULL,
  vencimiento DATE NOT NULL,
  concepto VARCHAR(25),
  almacenId VARCHAR(40) NOT NULL,
  FOREIGN KEY (contactId) REFERENCES contactos(id),
  FOREIGN KEY (vendedorId) REFERENCES vendedores(id),
  FOREIGN KEY (almacenId) REFERENCES almacenes(id)
);

CREATE TABLE productosRemito (
  idRemito VARCHAR(200) NOT NULL,
  idProducto VARCHAR (40) NOT NULL,
  FOREIGN KEY (idRemito) REFERENCES remitos(id),
  FOREIGN KEY (idProducto) REFERENCES productos(id)
);


CREATE TABLE almacenes (
  id VARCHAR(40) NOT NULL PRIMARY KEY,
  nombre VARCHAR(255) NOT NULL,
  observaciones VARCHAR(255)
)

CREATE TABLE vendedores (
  id VARCHAR(30) NOT NULL PRIMARY KEY,
  typeId VARCHAR(10) NOT NULL,
  nombre VARCHAR(255) NOT NULL,
  telefono VARCHAR(30),
  correo VARCHAR(400),
  domicilio VARCHAR(255),
  localidad VARCHAR(255)
);


CREATE TABLE bancos (
  id VARCHAR(40) NOT NULL PRIMARY KEY,
  nmroDeCuenta VARCHAR(100),
  entidad VARCHAR(255),
  tipo VARCHAR(255),
  saldo FLOAT
);

CREATE TABLE notaDeCredito (
  id VARCHAR(200) NOT NULL PRIMARY KEY,
  tipo VARCHAR(1) NOT NULL,
  idFactura VARCHAR (200) NOT NULL,
  concepto VARCHAR(40),
  condicion VARCHAR(30),
  notas VARCHAR(300),
  cuentaBancaria VARCHAR(40) NOT NULL,
  FOREIGN KEY(idFactura) REFERENCES facturasDeVenta(id),
  FOREIGN KEY(cuentaBancaria) REFERENCES bancos(id)
);


CREATE TABLE ajusteDeInventario (
  id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
  fecha DATE NOT NULL,
  hora TIME NOT NULL,
  tipo VARCHAR(15) NOT NULL,
  cantidad INT,
  costoInicial FLOAT,
  precioBase FLOAT,
  impuesto INT,
  precioTotal FLOAT,
  idProducto VARCHAR (40) NOT NULL,
  FOREIGN KEY (idProducto) REFERENCES productos(id)
);

CREATE TABLE numeracionFacturas(
  id VARCHAR(1) PRIMARY KEY,
  A  VARCHAR(8) NOT NULL,
  B  VARCHAR(8) NOT NULL,
  C  VARCHAR(8) NOT NULL
);

INSERT INTO numeracionFacturas (A,B,C,id) VALUES ("1","1","1","1");


CREATE TABLE cobranzas (
  id VARCHAR(200) NOT NULL PRIMARY KEY,
  total FLOAT NOT NULL,
  fecha DATE NOT NULL,
  metodoDePago VARCHAR(25), /*tarejta,depostio,etc*/
  ctaBancaria VARCHAR(40) NOT NULL,
  concepto VARCHAR(250), /*pago de factura de venta*/
  valor FLOAT,
  impuesto FLOAT,
  cantidad INT,
  observaciones VARCHAR(300),
  notas VARCHAR(250),
  FOREIGN KEY (ctaBancaria) REFERENCES bancos(id)
);

CREATE TABLE cobranzasPorfactura(
  idCobranza VARCHAR(200) NOT NULL,
  idFactura VARCHAR (200) NOT NULL,
  FOREIGN KEY (idCobranza) REFERENCES cobranzas(id),
  FOREIGN KEY (idFactura) REFERENCES facturasDeVenta(id)
);



CREATE TABLE facturasdeproveedores (
  nmro INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
  tipo VARCHAR(1) NOT NULL,
  contactId VARCHAR(30) NOT NULL,
  fecha DATE NOT NULL,
  condicion VARCHAR (20),
  plazoDePago INT NOT NULL,
  vencimiento DATE NOT NULL,
  concepto VARCHAR(25),
  estado VARCHAR(10),
  terminosCondiciones TEXT,
  notas VARCHAR(300),
  pie VARCHAR(300),
  tipoDePlazo varchar(100),
  total float,
  montoPagado float,
  montoPendiente float,
  FOREIGN KEY (contactId) REFERENCES contactos(id)
);

/*Items inventariables*/
CREATE TABLE itemsInventariablesFP(
  idProducto VARCHAR (40) NOT NULL,
  idFactura  INT AUTO_INCREMENT NOT NULL,
  precio FLOAT,
  cantidad INT,
  impuesto INT,
  bonificacion FLOAT,
  FOREIGN KEY (idProducto) REFERENCES productos(id),
  FOREIGN KEY (idFactura) REFERENCES facturasdeproveedores(nmro),
);


CREATE TABLE itemsFP(
  idFactura  INT AUTO_INCREMENT NOT NULL,
  detalle VARCHAR(300) NOT NULL,
  precio FLOAT,
  cantidad INT,
  impuesto INT,
  bonificacion FLOAT,
  FOREIGN KEY (idFactura) REFERENCES facturasdeproveedores(nmro)
);

SELECT *
FROM registro
WHERE fecha BETWEEN '2023-11-20' AND '2023-12-05';


select SUM((productosfacturados.precio*productosfacturados.cantidad)  * (productosfacturados.bonificacion/100)) AS bonificacion, SUM(((productosfacturados.precio*productosfacturados.cantidad) -  ((productosfacturados.precio*productosfacturados.cantidad)  * (productosfacturados.bonificacion/100))) * (productosfacturados.impuesto/100)) AS iva from productosfacturados WHERE idFactura = "4ec50d3d-df28-41a9-a6fe-a253527275b6";


/*

SELECT *
FROM cobranzas
WHERE fecha BETWEEN '2023-01-18' AND '2023-02-05' ORDER BY fecha ASC;



SELECT * 
FROM facturasdeventa 
WHERE fecha BETWEEN '2023-01-18' AND '2023-02-05' ORDER BY fecha ASC
;


PARTE CONTAAAAABLEEEE


SELECT facturasdeventa.fecha, facturasdeventa.condicion, "factura de venta" AS categoria,
(facturasdeventa.total - SUM((productosfacturados.precio*productosfacturados.cantidad)  * (productosfacturados.bonificacion/100))) AS deudoresPorVenta,
(facturasdeventa.total - SUM(((productosfacturados.precio*productosfacturados.cantidad) -  ((productosfacturados.precio*productosfacturados.cantidad)  * (productosfacturados.bonificacion/100))) * (productosfacturados.impuesto/100))) AS ventas,
SUM(productosfacturados.precio*productosfacturados.cantidad) AS importeNetoGravado,
SUM((productosfacturados.precio*productosfacturados.cantidad)  * (productosfacturados.bonificacion/100)) AS bonificacion, SUM(((productosfacturados.precio*productosfacturados.cantidad) -  ((productosfacturados.precio*productosfacturados.cantidad)  * (productosfacturados.bonificacion/100))) * (productosfacturados.impuesto/100)) AS iva from facturasdeventa INNER JOIN productosfacturados ON facturasdeventa.id = productosfacturados.idFactura WHERE facturasdeventa.id = ? ;


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
WHERE facturasdeventa.id =


facturas de proveedores:
SELECT
facturasdeproveedores.fecha, facturasdeproveedores.nmro AS nmroFact, facturasdeproveedores.tipo AS tipoFact, "facturas de proveedores" AS categoria, 
facturasdeproveedores.concepto, facturasdeproveedores.total, 
SUM((itemsfp.precio * itemsfp.cantidad) * (itemsfp.bonificacion / 100)) AS bonificacion, 
SUM(((itemsfp.precio * itemsfp.cantidad) - ((itemsfp.precio * itemsfp.cantidad) * (itemsfp.bonificacion / 100))) * (itemsfp.impuesto / 100)) AS iva,
(facturasdeproveedores.total - SUM((itemsfp.precio * itemsfp.cantidad) * (itemsfp.bonificacion / 100))) AS proveedores
FROM facturasdeproveedores INNER JOIN itemsfp ON facturasdeproveedores.id = itemsfp.idFactura WHERE facturasdeproveedores.id = "322ec6a7-2d4c-4835-9475-2b17bff3f625";


una propiedad "categoria"
fecha
condicion


Mercaderia
  IVA Credito Fiscal
  Proveedores

 
                                  DEBE           HABER
                                __________________________ 
Deudores por Venta             | 95657.07    |            |
Descuentos Cedidos             | 9672.10     |            |
        a IVA Debito Fiscal    |             |  18280.27  |
        a ventas               |             |  87048.90  |


*/


/*

USE proyecto1;
SET SQL_SAFE_UPDATES = 0;
UPDATE facturasdeventa SET montoPendiente = total;
select * from facturasdeventa;


Como hago si esta factura es una compra de mercaderia ? Donde coloco la categoria "mercaderia"

Factura de proveedores con IVA y bonificacion
+---------------------------------+------------+---------+
|            Cuentas              |    Debe    |  Haber  |
+---------------------------------+------------+---------+
| Proveedores                      | 154,000.00 |         |
|    a IVA Débito Fiscal          |            |  4,000.00|
| Descuentos obtenidos             |   7,700.00 |         |
| Cuentas por Pagar                |            |151,300.00|
+---------------------------------+------------+---------+
Pago de la factura:
+----------------------------------+------------+-----------+
|            Cuentas               |    Debe    |  Haber    |
+----------------------------------+------------+-----------+
| Cuentas por Pagar                | 151,300.00 |           |
|                 Caja/Bancos      |            |151,300.00 |
+----------------------------------+------------+-----------+

///Factura para mercaderia

+----------------------------------+------------+---------+
|            Cuentas               |    Debe    |  Haber  |
+----------------------------------+------------+---------+
| Inventario o Mercadería          | 154,000.00 |         |
|    a IVA Débito Fiscal          |            |  4,000.00|
| Descuentos obtenidos             |   7,700.00 |         |
| Proveedores                      |            |151,300.00|
+----------------------------------+------------+---------+

+----------------------------------+------------+-----------+
|            Cuentas               |    Debe    |  Haber    |
+----------------------------------+------------+-----------+
| Proveedores                      | 151,300.00 |           |
|                 Caja/Bancos      |            |151,300.00 |
+----------------------------------+------------+-----------+

//////////////////////////////////////////




Pago de la factura:
+----------------------------------+------------+-----------+
|            Cuentas               |    Debe    |  Haber    |
+----------------------------------+------------+-----------+
| Cuentas por Pagar                | 151,300.00 |           |
|                 Caja/Bancos      |            |151,300.00 |
+----------------------------------+------------+-----------+



Factura de venta:
+-----------------------+-------------+-------------+
|     Cuentas           |    Debe     |    Haber    |
+-----------------------+-------------+-------------+
| Deudores por Venta    |  95657.07   |             |
| Descuentos Cedidos    |   9672.10   |             |
|    a IVA Débito Fiscal|             |  18280.27   |
|    a ventas           |             |  87048.90   |
+-----------------------+-------------+-------------+


Pago de una factura de venta con deposito
+---------------------------------+------------+---------+
|            Cuentas              |    Debe    |  Haber  |
+---------------------------------+------------+---------+
| Caja/Bancos (BBVA)              | Monto      |         |
| Deudores por Venta              |            |  Monto  |
+---------------------------------+------------+---------+



*/
