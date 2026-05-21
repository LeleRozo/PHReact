import {
  Routes,
  Route,
} from "react-router-dom"; /**para usar rutas en la aplicación se importa y luego se usa */
import "./App.css";
import Login from "./pages/login.jsx";
import Registro from "./pages/registroUsuario.jsx";
import Home from "./pages/home.jsx";
import HistorialH from "./pages/historialH.jsx";
import RegistroH from "./pages/registroH.jsx";

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
      <Route path="/historialH" element={<HistorialH />} />
      <Route path="/registroH" element={<RegistroH/>}/>
    </Routes>
  );
}

export default App;
