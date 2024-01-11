import fs from 'fs';
import { Wsaa,Wsfe } from 'afipjs';
import 'dotenv/config';

const pem = fs.readFileSync(process.env.APP_ROUTE_CERT, 'utf8')
const key = fs.readFileSync(process.env.APP_ROUTE_KEY, 'utf8')

const afipConfig = {
    prod: false,
    debug: true,
}

const wsaa = new Wsaa(afipConfig)

wsaa.setCertificate(pem)
wsaa.setKey(key)

export default wsaa