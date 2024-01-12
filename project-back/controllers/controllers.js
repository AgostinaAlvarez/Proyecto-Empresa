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
        const result = await connect.execute('SELECT * FROM usuarios WHERE email = ?',[email]);
        //console.log(result)
        if(result[0].length !== 1){
          return res.status(401).json({ok:false,code:1,message:"el email no es valido"});
        }
        const user = result[0][0]
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if(isPasswordValid === false){
          return res.status(401).json({ok:false,code:2,message:"contraseña incorrecta"});
        }
        const token = jwt.sign({email}, process.env.JWT_SECRET_KEY);
        return res.status(200).json({ ok: true,code:0,message: 'Login exitoso',token});
    }catch(err){
        return res.json({ok:false,message:"error del servidor"}).status(400)
    }
}

//Signin de usuario:
export const signin = async (req,res) =>{
    const { id,email,password } = req.body;
    const criptPass = await bcrypt.hash(password,parseInt(process.env.BCRYPT_HASH))
    try{
        await connect.execute('INSERT INTO usuarios (id,email,password) VALUES (?,?,?)',[id,email,criptPass])
        return res.status(201).json({ok:true})
    }catch(err){
        return res.status(400).json({ok:false})
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