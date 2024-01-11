// afipController.js
import wsfe from './afipService';

async function obtenerCAE(datosFactura) {
  try {
    const response = await wsfe.FECAESolicitar(datosFactura)
    return response;
  } catch (error) {
    console.error('Error al obtener CAE:', error)
    throw error;
  }
}


export { obtenerCAE };
