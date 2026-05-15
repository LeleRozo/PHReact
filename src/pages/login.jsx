import "../styles/login.css"; //hoja de estilos
import { Link } from "react-router-dom";
//en jsx todo el codigo va dentro de funciones y todo lo que vaya a usar externo al codigo se tiene que importar primero
//las clases se nombran className
function Login() {
  return (
    <div className="login">
      <form className="formularioL">
        <h2>LOGIN</h2>
        <input type="text" name="usuario" placeholder="Usuario" required />
        <input
          type="password"
          name="contraseña"
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
