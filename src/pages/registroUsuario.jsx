import "../styles/login.css";
import "../styles/registroUsuario.css";
import { Link } from "react-router-dom";
import { useState } from "react"; //herramienta de react para guardar datos que pueden cambiar.

function Registro() {
  const [nombres, setNombres] = useState("");
  const [apellidos, setApellidos] = useState("");
  const [telefono, setTelefono] = useState("");
  const [usuario, setUsuario] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [verifContrasena, setVerifContrasena] = useState("");

  //creacion de funcion que guarda los inputs temporalmente
  const registrarUsuario = (e) => {
    e.preventDefault();

    /**aqui muestro los datos por consola 
    console.log(nombres);
    console.log(apellidos);
    console.log(telefono);
    console.log(usuario);
    console.log(contrasena);
*/

    //creo un objeto
    const nuevoUsuario = {
      nombres,
      apellidos,
      telefono,
      usuario,
      contrasena,
    };
    //lee los usuarios guardados o de los contrario usa uno vació(json.parse convierte texto a array)
    const usuariosGuardados =
      JSON.parse(localStorage.getItem("usuarios")) || [];

    //validaciones de información dentro del formulario
    //creo una variable que contenga solo letras.

    //veriicación

    //verificación de que las contraseñas coincidan.
    if (contrasena !== verifContrasena) {
      alert("Las contraseñas no coinciden, por favor verifique la información");
      return;
    }

    //si hay campos obligatorios vacíos
    if (
      !nombres ||
      !apellidos ||
      !telefono ||
      !usuario ||
      !contrasena ||
      !verifContrasena
    ) {
      alert(
        "⚠️ Debes completar el formulario, todos los campos son obligatorios*",
      );
      return; //se detiene y no guarda nada.
    }

    //agrega el nuevo usuario guardado
    usuariosGuardados.push(nuevoUsuario);

    //guarda nuevamente con el usuario actualizado (json.stringify convierte un array a texto)
    localStorage.setItem("usuarios", JSON.stringify(usuariosGuardados));
    //muestra los usuariosGuardados por consola
    console.log(usuariosGuardados);

    //mensaje de exito
    alert("Usuario registrado correctamente");

    //limpiar inputs
    setNombres("");
    setApellidos("");
    setTelefono("");
    setUsuario("");
    setContrasena("");
    setVerifContrasena("");
  };

  return (
    <div className="containerR">
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
