//se importa useState para guardar los datos que cambian dentro del componente.
import { useState } from "react";
//importa useNavigate para poder cambiar de pagina automaticamentee.
import { useNavigate } from "react-router-dom";

import "../styles/login.css"; //hoja de estilos
import { Link } from "react-router-dom";

//en jsx todo el codigo va dentro de funciones y todo lo que vaya a usar externo al codigo se tiene que importar primero
//las clases se nombran className
function Login() {
  //se crea un estado para guardar el dato que ingresa el usuario en el campo usuario y lo mismo con contraseña
  const [usuario, setUsuario] = useState("");
  const [contrasena, setContrasena] = useState("");
  //esta constante se crea para redireccionar entre páginas
  const navigate = useNavigate();

  const iniciarSesion = (e) => {
    //evita que la pagina se recargue al enviar el formulario
    e.preventDefault();

    //obtiene usuarios guardados, convierte a texto, convierte a array, si no existen usuarios guardados usa un array vacío.
    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    //busca dentro del array un usuario que coincida
    const usuarioEncontrado = usuarios.find(
      //user representa cada usuario guardado dentro del array, verifica que un usuario sea igual al usuario ingresado y lo mismo la contraseña
      (user) => user.usuario === usuario && user.contrasena === contrasena,
    );

    //si no encuentra coincidencias
    if (!usuarioEncontrado) {
      alert("Usuario o Contraseña incorrectos.");
      return;
    }

    //se guarda la sesión iniciada, usuarioActivo nombre de clave
    localStorage.setItem("usuarioActivo", JSON.stringify(usuarioEncontrado));

    //redirige automaticamentee a la ruta /home
    navigate("/home");
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
