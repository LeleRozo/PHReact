import logo from "../assets/logo.png";
import "../styles/navbar.css";
import { IoHomeOutline, IoCalendarOutline } from "react-icons/io5";
import { LuUsersRound } from "react-icons/lu";
import { RiHotelBedLine } from "react-icons/ri";
import { LiaTshirtSolid } from "react-icons/lia";
import { MdOutlineShoppingCart } from "react-icons/md";
import { TbReport } from "react-icons/tb";
import { BsNut, BsBoxArrowLeft } from "react-icons/bs";
function Navbar() {
  return (
    <nav className="navbar">
      <img className="logo" src={logo} alt="logo" />
      <ul className="items">
        <ol class="item">
          <IoHomeOutline class="icon" />
          Inicio
        </ol>
        <a href="/frontend/pages/regClientes.html">
          <ol class="item">
            <LuUsersRound className="icon" />
            Clientes
          </ol>
        </a>
        <ol className="item">
          <IoCalendarOutline className="icon" />
          Reservas
        </ol>
        <ol className="item">
          <RiHotelBedLine className="icon" />
          Habitaciones
        </ol>
        <ol className="item">
          <LiaTshirtSolid className="icon" />
          Servicios
        </ol>
        <ol className="item">
          <MdOutlineShoppingCart className="icon" />
          Productos
        </ol>
        <ol className="item">
          <TbReport className="icon" />
          Reportes
        </ol>
        <div className="itemsFin">
          <ol className="item">
            <BsNut className="icon" />
            Configuración
          </ol>
          <ol className="item">
            <BsBoxArrowLeft className="icon" />
            Cerrar sesión
          </ol>
        </div>
      </ul>
    </nav>
  );
}

export default Navbar;
