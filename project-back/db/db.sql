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




/*

USE proyecto1;
SET SQL_SAFE_UPDATES = 0;
UPDATE facturasdeventa SET montoPendiente = total;
select * from facturasdeventa;


*/
