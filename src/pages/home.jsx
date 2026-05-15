import "../styles/home.css"; //hoja de estilos del home
import Navbar from "../components/navbar"; //importo el componente navbar para mostrarlo en esta vista
import { MdOutlinePersonAddAlt, MdOutlineHistory, MdCleaningServices } from "react-icons/md"; //import de los iconos que uso dentro de la vista home
import { FaBed } from "react-icons/fa";
import { IoBed } from "react-icons/io5";
import { LuCalendarPlus2 } from "react-icons/lu";


function Home() {
  return (
    <div className="containerInicio">
      <Navbar /> {/**etiqueta simple para usar el componente que acabo de importar para mostrarlo en el home */}
      <h2>INICIO</h2>

      <div className="cardsContainer">
        <div className="card" id="card1">
          <h5>Total de habitaciones</h5>
          <p>
            <FaBed className="icon"/>
            50
          </p>
        </div>
        <div className="card" id="card2">
          <h5>Habitaciones disponibles</h5>
          <p>
            <IoBed className="icon"/>
            25
          </p>
        </div>
        <div className="card" id="card3">
          <h5>Habitaciones ocupadas</h5>
          <p>
            <FaBed className="icon"/>
            23
          </p>
        </div>
        <div className="card" id="card4">
          <h5>En espera de limpieza</h5>
          <p>
            <MdCleaningServices className="icon"/>
            2
          </p>
        </div>
      </div>

      <div className="accionRap">
        <h5>ACCIONES RÁPIDAS</h5>
        <ul className="list">
          <li>
            <a href="">
              <MdOutlinePersonAddAlt  className="icon"/>
              Registrar cliente
            </a>
          </li>
          <li>
            <a href="">
              <LuCalendarPlus2  className="icon"/>
            Nueva reserva
            </a>
          </li>

          <li>
            <a href="">
              <MdOutlineHistory className="icon"/>
              Historial de servicios
            </a>
          </li>
          <li>
            <a href="/frontend/pages/historialClientes.html">
              <MdOutlineHistory className="icon"/> {/**etiqueta de icono en verde */}
              Historial de clientes
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Home;
