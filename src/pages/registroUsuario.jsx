import "../styles/login.css";
import "../styles/registroUsuario.css";
import { Link } from "react-router-dom";
import { useState } from "react"; //herramienta de react para guardar datos que pueden cambiar.
import Notificacion from "../components/notificacion";
//import { AiOutlineAim } from "react-icons/ai";

//se crea la función con el nombre de la vista, parte logica de la función, return lo que ve el usuario.
function Registro() {
  const [nombres, setNombres] = useState("");
  const [apellidos, setApellidos] = useState("");
  const [telefono, setTelefono] = useState("");
  const [usuario, setUsuario] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [verifContrasena, setVerifContrasena] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [tipoMensaje, setTipoMensaje] = useState("");

  //creo la función registrar usuario, async le dice a js que esta funcion va a hacer operaciónes que toman tiempo y e.prevent evita que el formulario recargue la pagina al enviarse.
  const registrarUsuario = async (e) => {
    e.preventDefault();

    if (contrasena !== verifContrasena) {
      alert("Las contraseñas no coinciden");
      return;
    }
    //creamos la variable respuesta para que guarde la respuesta de php, await le dice que espere a que php responda.
    const respuesta = await fetch("/api/usuarios", {
      method: "POST",
      //los headers son metadatos que acompañan una peticion y content-type: application/json, le dice a php que los datos que se van a enviar van en formato json.
      headers: {
        "Content-Type": "application/json",
      },
      //este body son los datos que viajan en la petición, json.stringify convierte los datos que ingresa el cliente en formato json para que php pueda leerlos.
      body: JSON.stringify({
        nombres,
        apellidos,
        telefono,
        usuario,
        contrasena,
      }),
    });
    //creando la variable data y le decimos  que espere la respuesta y que luego la convierta a json
    const data = await respuesta.json();

    if (data.mensaje) {
      setMensaje(data.mensaje);
      setTipoMensaje("exito");
      setTimeout(() => setMensaje(""), 3000); //si data contiene un mensaje actualiza el estado del mensaje y muestralo , luego de 3 seg actualiza de nuevo setmensaje a vacío.
    } else if (data.error) {
      setMensaje(data.error);
      setTipoMensaje("error");
      setTimeout(() => setMensaje(""), 3000); //y si contiene un error, muestralo y haz lo mismo de arriba.
    }

    //volvemos a actualizar el estado a vacío. para que los inputs queden vacios luego de enviar la información
    setNombres("");
    setApellidos("");
    setTelefono("");
    setUsuario("");
    setContrasena("");
    setVerifContrasena("");
  };

  return (
    <div className="containerR">
      <Notificacion mensaje={mensaje} tipo={tipoMensaje} />
      <h2>REGISTRO</h2>
      <form
        className="formularioR"
        id="formRegistro"
        onSubmit={registrarUsuario}
      >
        <div className="inputsform">
          <input
            type="text"
            name="nombres"
            placeholder="Nombres"
            value={nombres}
            onChange={(e) => setNombres(e.target.value)}
          />
          <input
            type="text"
            name="apellidos"
            placeholder="Apellidos"
            value={apellidos}
            onChange={(e) => setApellidos(e.target.value)}
          />
          <input
            type="text"
            name="telefono"
            placeholder="Telefono"
            value={telefono}
            onChange={(e) => setTelefono(e.target.value)}
          />
          <input
            type="text"
            name="usuario"
            placeholder="Usuario"
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
          />
          <input
            type="password"
            placeholder="Contraseña"
            name="contrasena"
            value={contrasena}
            onChange={(e) => setContrasena(e.target.value)}
          />
          <input
            type="password"
            placeholder="Verifique la contraseña"
            name="verifContrasena"
            value={verifContrasena}
            onChange={(e) => setVerifContrasena(e.target.value)}
          />
        </div>
        <button className="btn" type="submit">
          REGISTRAR
        </button>
      </form>
      <p>
        ¿Ya tienes una cuenta? ábrela
        <b>
          <Link to="/Login"> Aquí </Link>
        </b>
      </p>
    </div>
  );
}
//siempre se exporta la función al final para poder importarla en otros archivos
export default Registro;
