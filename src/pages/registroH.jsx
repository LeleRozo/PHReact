import "../styles/registroH.css";
import { useState, useEffect } from "react"; //para manejar estados
import "../components/navbar";
import Navbar from "../components/navbar";
import Notificacion from "../components/notificacion";

function RegistroH() {
  const [nombres, setNombres] = useState("");
  const [apellidos, setApellidos] = useState("");
  const [tipoDocumento, setTipoDocumento] = useState("");
  const [numeroDocumento, setNumeroDocumento] = useState("");
  const [telefono, setTelefono] = useState("");
  const [ocupacion, setOcupacion] = useState("");
  const [tipoHabitacion, setTipoHabitacion] = useState("");
  const [numeroHabitacion, setNumeroHabitacion] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [tipoMensaje, setTipoMensaje] = useState("");
  const [habitaciones, setHabitaciones] = useState([]);
  const [numerosFiltrados, setNumerosFiltrados] = useState([]);

  //traer las  habitaciones del back
  useEffect(() => {
    fetch("/api/habitaciones")
      .then((res) => res.json())
      .then((data) => setHabitaciones(data));
  }, []);

  //funcion para filtracion de numero de hab segun el tipo de habitacion.
  const handleTipoHabitacion = (e) => {
    const tipo = e.target.value;
    setTipoHabitacion(tipo);
    setNumeroHabitacion(""); // resetea el número cuando cambia el tipo
    // filtra las habitaciones que sean del tipo elegido Y estén disponibles
    const filtradas = habitaciones.filter(
      (hab) => hab.tipo_habitacion === tipo && hab.estado === "disponible",
    );
    setNumerosFiltrados(filtradas);
  };

  const guardarUsuario = async (e) => {
    e.preventDefault();

    const respuesta = await fetch("/api/registroH", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nombres,
        apellidos,
        tipoDocumento,
        numeroDocumento,
        telefono,
        ocupacion,
        tipoHabitacion,
        numeroHabitacion,
      }),
    });

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

    //limpiar formulario

    setNombres("");
    setApellidos("");
    setTipoDocumento("");
    setNumeroDocumento("");
    setTelefono("");
    setOcupacion("");
    setTipoHabitacion("");
    setNumeroHabitacion("");
  };

  const cancelarRegistro = () => {
    setNombres("");
    setApellidos("");
    setTipoDocumento("");
    setNumeroDocumento("");
    setTelefono("");
    setOcupacion("");
    setTipoHabitacion("");
    setNumeroHabitacion("");
  };

  return (
    <div className="containerClientes">
      <Navbar />

      <h2>CLIENTES</h2>
      <div className="cuadro">
        <h5>INFORMACIÓN PERSONAL</h5>
        <Notificacion mensaje={mensaje} tipo={tipoMensaje} />
        <form
          onSubmit={guardarUsuario}
          className="formRClientes"
          id="formClientes"
        >
          {/**value conecta el input con el estado y onChange detecta cambios en el valor */}
          <input
            type="text"
            placeholder="Nombres*"
            name="nombres"
            value={nombres}
            onChange={(e) => setNombres(e.target.value)}
            required
          />
          <input
            type="text"
            name="apellidos"
            placeholder="Apellidos*"
            value={apellidos}
            onChange={(e) => setApellidos(e.target.value)}
            required
          />
          <select
            name="tipoDocumento"
            className="tipoDoc"
            value={tipoDocumento}
            onChange={(e) => setTipoDocumento(e.target.value)}
          >
            <option value="">Tipo de documento</option>
            <option value="cc">Cedula de ciudadanía</option>
            <option value="ce">Cedula de extrangería</option>
            <option value="ti">Targeta de identidad</option>
          </select>
          <input
            type="text"
            placeholder="Número de documento*"
            name="numeroDocumento"
            value={numeroDocumento}
            onChange={(e) => setNumeroDocumento(e.target.value)}
            required
          />
          <input
            type="tel"
            placeholder="Telefono*"
            name="telefono"
            value={telefono}
            onChange={(e) => setTelefono(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Ocupación"
            name="ocupacion"
            value={ocupacion}
            onChange={(e) => setOcupacion(e.target.value)}
          />
          <hr />
          <div className="infoHabitación">
            <h5>INFORMACIÓN DE ESTADÍA</h5>
            <div className="estadia">
              {/* Select de tipo — opciones dinámicas según lo guardado en BD */}
              <select
                name="tipoHabitacion"
                className="tipoHab"
                value={tipoHabitacion}
                onChange={handleTipoHabitacion}
              >
                <option value="">Tipo de habitación</option>
                {/* saca los tipos únicos de las habitaciones disponibles */}
                {[
                  ...new Set(
                    habitaciones
                      .filter((h) => h.estado === "disponible")
                      .map((h) => h.tipo_habitacion),
                  ),
                ].map((tipo) => (
                  <option key={tipo} value={tipo}>
                    {tipo}
                  </option>
                ))}
              </select>
              {/* Select de número — solo aparece si ya eligió un tipo */}
              <select
                name="numeroHabitacion"
                className="tipoHab"
                value={numeroHabitacion}
                onChange={(e) => setNumeroHabitacion(e.target.value)}
                disabled={!tipoHabitacion}
              >
                <option value="">
                  {tipoHabitacion
                    ? "Selecciona número"
                    : "Primero elige el tipo"}
                </option>
                {numerosFiltrados.map((hab) => (
                  <option key={hab.id} value={hab.numero_habitacion}>
                    Habitación {hab.numero_habitacion}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </form>
        <div className="botones">
          <button type="button" className="boton" onClick={cancelarRegistro}>
            Cancelar
          </button>
          <button
            type="submit"
            className="boton"
            //al hacer click ejecuta la funcion guardar
            onClick={guardarUsuario}
          >
            Guardar
          </button>
        </div>
      </div>
    </div>
  );
}

export default RegistroH;
