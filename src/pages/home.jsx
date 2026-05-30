import "../styles/home.css"; //hoja de estilos del home
import Navbar from "../components/navbar"; //importo el componente navbar para mostrarlo en esta vista
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

//useEffect es un hook que ejecuta codigo luego de que un componente se carga.
import { useEffect } from "react";

//import de los iconos que uso dentro de la vista home
import {
  MdOutlinePersonAddAlt,
  MdOutlineHistory,
  MdCleaningServices,
} from "react-icons/md";
import { FaBed } from "react-icons/fa";
import { IoBed } from "react-icons/io5";
import { LuCalendarPlus2 } from "react-icons/lu";

//vista home
function Home() {
  //al home le agregamos una verificación para saber si ya hay una sesion iniciada y si no que se salga de inmediato y envie al login.

  //definimos navigate para poder usarlo abajo
  const navigate = useNavigate();

  //luego de que el componente home.jsx carga, revisa si hay una sesion iniciada.
  useEffect(() => {
    const usuarioActivo = localStorage.getItem("usuarioActivo");

    //entonces preguntamos si no hay sesion iniciada entonces redirige al login, reemplaza la page por la del login
    if (!usuarioActivo) {
      navigate("/login", { replace: true });
    }
  }, [navigate]);

  return (
    <div className="containerInicio">
      <Navbar />
      {/**etiqueta simple para usar el componente que acabo de importar para mostrarlo en el home */}
      <h2>INICIO</h2>
      <div className="cardsContainer">
        <div className="card" id="card1">
          <h4>Total de habitaciones</h4>
          <p>
            <FaBed className="icon" />
            50
          </p>
        </div>
        <div className="card" id="card2">
          <h4>Habitaciones disponibles</h4>
          <p>
            <IoBed className="icon" />
            25
          </p>
        </div>
        <div className="card" id="card3">
          <h4>Habitaciones ocupadas</h4>
          <p>
            <FaBed className="icon" />
            23
          </p>
        </div>
        <div className="card" id="card4">
          <h4>En espera de limpieza</h4>
          <p>
            <MdCleaningServices className="icon" />2
          </p>
        </div>
      </div>
      <div className="accionRap">
        <h5>ACCIONES RÁPIDAS</h5>
        <ul className="list">
          <li>
            <a href="">
              <MdOutlinePersonAddAlt className="icon" />
              Registrar cliente
            </a>
          </li>
          <li>
            <a href="">
              <LuCalendarPlus2 className="icon" />
              Nueva reserva
            </a>
          </li>

          <li>
            <a href="">
              <MdOutlineHistory className="icon" />
              Historial de servicios
            </a>
          </li>
          <li>
            <Link to="/historialH">
              <MdOutlineHistory className="icon" />
              {/**etiqueta de icono en verde */}
              Historial de clientes
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Home;
