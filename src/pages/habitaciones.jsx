import "../styles/habitaciones.css";
import Navbar from "../components/navbar";
import { Link } from "react-router-dom";

function Habitaciones() {
  return (
    <div>
      <Navbar />
      <div contendedorPrincipal>
        <Link>Habitaciones</Link>
        <Link to="/EdicionHabitaciones">Edición de habitaciones</Link>
      </div>
    </div>
  );
}

export default Habitaciones;
