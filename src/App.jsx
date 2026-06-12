import {
  Routes,
  Route,
} from "react-router-dom"; /**para usar rutas en la aplicación se importa y luego se usa */
import "./App.css";
import Login from "./pages/login.jsx";
import Registro from "./pages/registroUsuario.jsx";
import Home from "./pages/home.jsx";
import GestionHuespedes from "./pages/gestionHuespedes.jsx";
import RegistroH from "./pages/registroH.jsx";
import Habitaciones from "./pages/habitaciones.jsx";
import EdicionHabitaciones from "./pages/edicionHabitaciones.jsx";

function App() {
  return (
    <Routes>
      {/* Ruta inicial */}
      <Route path="/" element={<Login />} />
      {/* Ruta para el login */}
      <Route path="/login" element={<Login />} />
      {/* Ruta para abrir la página de registro */}
      <Route path="/registro" element={<Registro />} />
      {/**ruta para el inicio de la aplicación */}
      <Route path="/home" element={<Home />} />
      {/**ruta para abrir el historialde huespedes  */}
      <Route path="/historialH" element={<GestionHuespedes />} />
      <Route path="/registroH" element={<RegistroH />} />
      {/**ruta para habitaciones */}
      <Route path="/habitaciones" element={<Habitaciones />} />
      {/**ruta para la edicion de habitaciones */}
      <Route path="/edicionHabitaciones" element={<EdicionHabitaciones />} />
    </Routes>
  );
}

export default App;
