import {
  Routes,
  Route,
} from "react-router-dom"; /**para usar rutas en la aplicación se importa y luego se usa */
import "./App.css";
import Login from "./pages/login.jsx";
import Registro from "./pages/registroUsuario.jsx";
import Home from "./pages/home.jsx";

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
      <Route path="/home" element={<Home/>} />
    </Routes>
  );
}

export default App;
