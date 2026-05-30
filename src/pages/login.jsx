//se importa useState para guardar los datos que cambian dentro del componente.
import { useState } from "react";
//importa useNavigate para poder cambiar de pagina automaticamentee.
import { useNavigate } from "react-router-dom";

import "../styles/login.css"; //hoja de estilos
import { Link } from "react-router-dom";
import Notificacion from "../components/notificacion";

//en jsx todo el codigo va dentro de funciones y todo lo que vaya a usar externo al codigo se tiene que importar primero
//las clases se nombran className
function Login() {
  //1. creamos los estados de los inputs porque cambiaran cuando el usuario ingrese los datos.

  const [usuario, setUsuario] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [tipoMensaje, setTipomensaje] = useState("");
  const navigate = useNavigate();

  //2. ahora escribo la funcion iniciar sesion que dice a js que esta funcion va a realizar operaciones que demoran(esperar las respuestas de php) y que no recargue la pagina luego de enviar el form
  const iniciarSesion = async (e) => {
    e.preventDefault();

    const respuesta = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        usuario,
        contrasena,
      }),
    });
    const data = await respuesta.json();
    //replace: true para que reemplace la pagina del login por la del home y no solo redirija porque se podria volver a acceder usando la flecha del navegador.
    if (data.mensaje) {
      //entonces si en data me llega un mensaje, primero, guardo lo que me llega en el localstorage
      localStorage.setItem("usuarioActivo", JSON.stringify(data.usuario));
      //y luego si ejecuto el navigate.
      navigate("/home", { replace: true });
    } else if (data.error) {
      setMensaje(data.error);
      setTipomensaje("error");
      setTimeout(() => setMensaje(""), 3000);
    }
  };

  return (
    <div className="login">
      <form className="formularioL" onSubmit={iniciarSesion}>
        <h2>LOGIN</h2>
        <input
          type="text"
          name="usuario"
          value={usuario}
          onChange={(e) => setUsuario(e.target.value)}
          placeholder="Usuario"
          required
        />
        <input
          type="password"
          name="contraseña"
          value={contrasena}
          onChange={(e) => setContrasena(e.target.value)}
          placeholder="Contraseña"
          required
        />
        <button className="btn" type="submit">
          INGRESAR
        </button>
        <Notificacion mensaje={mensaje} tipo={tipoMensaje} />
        <p>
          No tienes cuenta,
          <b>
            {/**la etiqueta link para añadir hipervinculos que permitan navegar entre vistas */}
            <Link to="/registro"> Crea una cuenta </Link>
          </b>
        </p>
      </form>
    </div>
  );
}
//se debe agregar la linea de export de la función para que funcione.
export default Login;
