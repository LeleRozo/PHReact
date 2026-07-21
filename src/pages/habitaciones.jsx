import "../styles/habitaciones.css";
import Navbar from "../components/navbar";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

function Habitaciones() {
  const [habitaciones, setHabitaciones] = useState([]);

  useEffect(() => {
    fetch("/api/habitaciones")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setHabitaciones(data);
      })
      .catch((error) => console.error(error));
  }, []);

  //cambiar estado de las cards

  const cambiarEstado = (id, nuevoEstado) => {
    // 1. Busca la habitación original y crea la versión con el estado nuevo
    const habitacionActual = habitaciones.find((hab) => hab.id === id);
    const habitacionActualizada = { ...habitacionActual, estado: nuevoEstado };

    // 2. Manda la habitación completa al backend
    fetch("/api/habitaciones", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(habitacionActualizada),
    })
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((error) => console.error(error));

    // 3. Actualiza la pantalla al instante
    setHabitaciones((prev) =>
      prev.map((hab) => (hab.id === id ? habitacionActualizada : hab)),
    );
  };

  return (
    <div>
      <Navbar />
      <div className="contprin">
        <div className="edihab">
          <Link to="/EdicionHabitaciones">Edición de habitaciones</Link>
        </div>
        <h2>HABITACIONES</h2>
        <div className="contenedorCards">
          {habitaciones.map((hab) => (
            <div
              className={`cardhab ${
                hab.estado === "disponible"
                  ? "disponible"
                  : hab.estado === "ocupada"
                    ? "ocupada"
                    : hab.estado === "en mantenimiento"
                      ? "mantenimiento"
                      : hab.estado === "fuera de servicio"
                        ? "fueraServicio"
                        : ""
              }`}
              key={hab.id}
            >
              <h3>Habitación {hab.numero_habitacion}</h3>
              <p>Tipo: {hab.tipo_habitacion}</p>
              <p>Estado: {hab.estado}</p>
              <p>Precio: ${hab.precio}</p>
              <select
                name="Estado"
                id=""
                value={hab.estado}
                onChange={(e) => cambiarEstado(hab.id, e.target.value)}
              >
                <option value="disponible">Disponible</option>
                <option value="ocupada">Ocupado</option>
                <option value="en mantenimiento">Mantenimiento</option>
                <option value="fuera de servicio">Fuera de servicio</option>
              </select>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Habitaciones;
