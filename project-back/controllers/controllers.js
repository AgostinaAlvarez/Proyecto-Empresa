import { connect } from "../db/db.js";
import cookieParser from "cookie-parser";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import 'dotenv/config';

//Middleware para verificar token
export const verifyToken = (req,res,next) =>{
    try{
      const token = req.cookies.tkn
      const validPayload = jwt.verify(token,process.env.JWT_SECRET_KEY)
      next()
    }catch(err){
      return res.status(401).json({ok:false,message:'invalid token',tkn:token})
    }
}
//Funcion check auth
export const checkAuth = async (req,res) =>{
    return res.status(200).json({ok:true,message:"auth token!"})
}

//Login de usuario:
export const login = async (req,res) =>{
    const { email,password } = req.body;
    try{    
        const result = await connUser.execute('SELECT * FROM usuarios WHERE email = ?',[email]);
        if(result.rows.length !== 1){
          return res.status(401).json({ok:false,message:"el email no es valido"});
        }
        const user = result.rows[0]
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if(!isPasswordValid){
          return res.json({ok:false,message:"contraseña incorrecta"}).status(400);
        }
        const token = jwt.sign({nombre:'usuario'}, process.env.JWT_SECRET_KEY);
        return res.status(200).json({ ok: true, message: 'Login exitoso', tkn: token, data:{nombre:'usuario'} });

    }catch(err){
        return res.json({ok:false,message:"error del servidor"}).status(400)
    }
}




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
        const [contactos] = await connect.execute('SELECT id,idType,nombre,correo FROM contactos ORDER BY nombre');
        const [clientes] = await connect.execute('SELECT contactos.id,contactos.idType,contactos.nombre,contactos.correo FROM clientes JOIN contactos ON clientes.contactId = contactos.id');
        const [proveedores] = await connect.execute('SELECT contactos.id,contactos.idType,contactos.nombre,contactos.correo FROM proveedores JOIN contactos ON proveedores.contactId = contactos.id');
        return res.status(200).json({ok:true,contactos,clientes,proveedores});
    }catch(err){
        return res.status(400).json({ok:false,message:err});
    }
}


export const createContact = async(req,res) =>{
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

}