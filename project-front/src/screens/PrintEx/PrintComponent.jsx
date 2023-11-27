/* eslint-disable react/display-name */
import React from 'react';
import ReactToPrint from 'react-to-print';

// El componente que quieres imprimir
const ComponentToPrint = React.forwardRef((props, ref) => (
  <div ref={ref}>
    {/* Contenido que se imprimirá */}
    <h1>Ejemplo de contenido para imprimir</h1>
    <p>Este es un texto que se imprimirá.</p>
  </div>
));

// Componente principal que renderiza el botón de impresión
const PrintComponent = () => {
  const componentRef = React.useRef();

  return (
    <div>
      <ReactToPrint
        trigger={() => <button>Imprimir</button>}
        content={() => componentRef.current}
      />
      <ComponentToPrint ref={componentRef} />
    </div>
  );
};

export default PrintComponent;
