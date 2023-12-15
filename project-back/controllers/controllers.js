import { connect } from "../db/db.js";


//
export const TesterFnc = async(req,res)=>{
    const [rows] = await connect.execute(`
        SELECT * FROM proveedores JOIN contactos ON proveedores.contactId = contactos.id;
    `);
    console.log(rows)
    console.log('respuesta');
    res.send('hola').status(200)
}
//


export const getContacts = async(req,res) =>{
    try{
        const [contactos] = await connect.execute('SELECT * FROM contactos ORDER BY nombre');
        const [clientes] = await connect.execute('SELECT * FROM clientes JOIN contactos ON clientes.contactId = contactos.id');
        const [proveedores] = await connect.execute('SELECT * FROM proveedores JOIN contactos ON proveedores.contactId = contactos.id');
        return res.status(200).json({ok:true,contactos,clientes,proveedores});
    }catch(err){
        return res.status(400).json({ok:false,message:err});
    }
}