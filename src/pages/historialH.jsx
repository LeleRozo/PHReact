import { useState } from "react";
import "../styles/historialH.css";
import { Link } from "react-router-dom";

function HistorialH() {
  //creo el estado donde se guardan los clientes
  //carga los clientes desde localStorage
  const [huespedes] = useState(() => {
    return JSON.parse(localStorage.getItem("huespedes")) || [];
  });

  return (
    <div className="contPrincipal">
      <button className="atras">
      <Link to="/home" >
        Home
      </Link>
      </button>
      <h2>HISTORIAL DE CLIENTES</h2>
      <input type="text" className="buscar" placeholder="Buscar..." />
      <ul className="contenedorList">
        <li>Nombres </li>
        <li>Apellidos </li>
        <li>Documento </li>
        <li>Teléfono </li>
        <li>Fecha de entrada </li>
        <li>Fecha de salída </li>
        <li>Habitación</li>
      </ul>

      {/**lista de clientes */}
      {huespedes.map((huesped, index) => (
        <ul className="listaClientes" key={index}>
          <li>{huesped.nombres}</li>
          <li>{huesped.apellidos}</li>
          <li>{huesped.numDoc}</li>
          <li>{huesped.telefono}</li>
          <li>{huesped.fechaEntrada}</li>
          <li>{huesped.fechaSalida}</li>
          <li>{huesped.habitacion}</li>
        </ul>
      ))}
    </div>
  );
}

export default HistorialH;
