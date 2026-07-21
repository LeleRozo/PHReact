import "../styles/edicionHabitaciones.css";
import { useState, useEffect } from "react";
import Notificacion from "../components/notificacion";
import { BsPencil } from "react-icons/bs";
import { RiDeleteBin6Line } from "react-icons/ri";
import { Link } from "react-router-dom";

function EdicionHabitaciones() {
  const [numero_habitacion, setNumeroHabitacion] = useState("");
  const [tipo_habitacion, setTipoHabitacion] = useState("");
  const [estado, setEstado] = useState("disponible");
  const [precio, setPrecio] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [TipoMensaje, setTipoMensaje] = useState("");
  const [habitaciones, setHabitaciones] = useState([]);

  // estado para saber si estamos editando y qué habitación
  const [editando, setEditando] = useState(false);
  const [idEditando, setIdEditando] = useState(null);

  // trae las habitaciones del backend
  const cargarHabitaciones = () => {
    fetch("/api/habitaciones")
      .then((res) => res.json())
      .then((data) => setHabitaciones(data));
  };

  useEffect(() => {
    cargarHabitaciones();
  }, []);

  const mostrarMensaje = (texto, tipo) => {
    setMensaje(texto);
    setTipoMensaje(tipo);
    setTimeout(() => setMensaje(""), 3000);
  };

  const limpiarFormulario = () => {
    setNumeroHabitacion("");
    setTipoHabitacion("");
    setEstado("disponible");
    setPrecio("");
    setEditando(false);
    setIdEditando(null);
  };

  // crear habitacion (POST)
  const guardarHabitacion = async (e) => {
    e.preventDefault();

    const respuesta = await fetch("/api/habitaciones", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        numero_habitacion,
        tipo_habitacion,
        estado,
        precio,
      }),
    });

    const data = await respuesta.json();

    if (data.mensaje) {
      mostrarMensaje(data.mensaje, "exito");
      cargarHabitaciones();
    } else if (data.error) {
      mostrarMensaje(data.error, "error");
    }

    limpiarFormulario();
  };

  // editar habitacion (PUT)
  const actualizarHabitacion = async (e) => {
    e.preventDefault();

    const respuesta = await fetch("/api/habitaciones", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: idEditando,
        numero_habitacion,
        tipo_habitacion,
        estado,
        precio,
      }),
    });

    const data = await respuesta.json();

    if (data.mensaje) {
      mostrarMensaje(data.mensaje, "exito");
      cargarHabitaciones();
    } else if (data.error) {
      mostrarMensaje(data.error, "error");
    }

    limpiarFormulario();
  };

  // llena el formulario con los datos de la habitacion a editar
  const iniciarEdicion = (hab) => {
    setIdEditando(hab.id);
    setNumeroHabitacion(hab.numero_habitacion);
    setTipoHabitacion(hab.tipo_habitacion);
    setEstado(hab.estado);
    setPrecio(hab.precio);
    setEditando(true);
    // hace scroll suave hacia el formulario
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // eliminar habitacion (DELETE)
  const eliminarHabitacion = async (id) => {
    const confirmar = window.confirm(
      "¿Seguro que deseas eliminar esta habitación?",
    );
    if (!confirmar) return;

    const respuesta = await fetch("/api/habitaciones", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });

    const data = await respuesta.json();

    if (data.mensaje) {
      mostrarMensaje(data.mensaje, "exito");
      cargarHabitaciones();
    } else if (data.error) {
      mostrarMensaje(data.error, "error");
    }
  };

  return (
    <div className="conPrincipal">
      <div className="edihab">
        <Link to="/home">Ir al inicio</Link>
      </div>
      <h2>HABITACIONES DISPONIBLES</h2>
      <p>Por favor registre los detalles de cada habitacion de su hotel</p>
      <Notificacion mensaje={mensaje} tipo={TipoMensaje} />

      <h2>{editando ? "Editar habitación" : "Registro de habitaciones"}</h2>

      <div>
        <form
          className="inputsHab"
          onSubmit={editando ? actualizarHabitacion : guardarHabitacion}
        >
          <input
            type="text"
            placeholder="Digite el numero de la habitación"
            name="numero_habitacion"
            value={numero_habitacion}
            onChange={(e) => setNumeroHabitacion(e.target.value)}
          />
          <select
            className="tipohabi"
            type="text"
            placeholder="Tipo de habitación"
            name="tipo_habitacion"
            value={tipo_habitacion}
            onChange={(e) => setTipoHabitacion(e.target.value)}
          >
            <option value="aire">Con aire</option>
            <option value="ventilador">Con ventilador</option>
          </select>

          <input
            type="text"
            placeholder="Cual es el precio de la habitación"
            name="precio"
            value={precio}
            onChange={(e) => setPrecio(e.target.value)}
          />
          <div className="btncenter">
            <button type="submit" className="btn">
              {editando ? "Actualizar" : "Guardar"}
            </button>
            {/* boton cancelar solo aparece cuando se está editando */}
            {editando && (
              <button
                type="button"
                className="btn"
                onClick={limpiarFormulario}
                style={{ marginLeft: "10px", backgroundColor: "gray" }}
              >
                Cancelar
              </button>
            )}
          </div>
        </form>
      </div>

      <div className="listaHabs">
        <h2>Lista de habitaciones registradas</h2>
        <ul className="titulos">
          <span>Numero</span>
          <span>Tipo</span>
          <span>Estado</span>
          <span>Precio</span>
          <span>Acción</span>
        </ul>
        {habitaciones.map((hab) => (
          <div className="filaHab" key={hab.id}>
            <span>{hab.numero_habitacion}</span>
            <span>{hab.tipo_habitacion}</span>
            <span>{hab.estado}</span>
            <span>{hab.precio}</span>
            <span>
              <button className="ico" onClick={() => iniciarEdicion(hab)}>
                <BsPencil />
              </button>
              <button
                className="ico"
                onClick={() => eliminarHabitacion(hab.id)}
              >
                <RiDeleteBin6Line />
              </button>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default EdicionHabitaciones;
