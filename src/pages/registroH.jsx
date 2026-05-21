import "../styles/registroH.css";
import { useState } from "react"; //para manejar estados
import "../components/navbar";
import Navbar from "../components/navbar";

function RegistroH() {
  const [huesped, setHuesped] = useState({
    //datos personales
    nombres: "",
    apellidos: "",
    tipoDocto: "",
    numDoc: "",
    telefono: "",
    ocupacion: "",

    //datos de estadía
    fechaEntrada: "",
    fechaSalida: "",
    habitacion: "",
  });

  //funcion que captura lo que escribe el usuario en los inputs
  const handleChange = (e) => {
    setHuesped({
      //copia los datos anteriores
      ...huesped,

      //guarda el valor que tomó el input
      [e.target.name]: e.target.value,
    });
  };

  //funcion para guardar el huesped en el localstorage
  const guardar = () => {
    const huespedesGuardados =
      JSON.parse(localStorage.getItem("huespedes")) || [];

    //agrega el nuevo huesped al array creado arriba
    huespedesGuardados.push(huesped);

    //se guarda nuevamente el array actualizado con el nuevo cliente en el localstorage
    localStorage.setItem("huespedes", JSON.stringify(huespedesGuardados));
    alert("El cliente fue registrado correctamente ✅");

    limpiarFormulario();
  };

  //limpiar inputs
  //creo la funcion para limpiar los inputs y al contenedor de estado setHuesped lo vuelvo a dejar vacío
  const limpiarFormulario = () => {
    setHuesped({
      nombres: "",
      apellidos: "",
      tipoDocto: "",
      numDoc: "",
      telefono: "",
      ocupacion: "",
      fechaEntrada: "",
      fechaSalida: "",
      habitacion: "",
    });
  };

  return (
    <div className="containerClientes">
      <Navbar />
      <h2>CLIENTES</h2>
      <div className="cuadro">
        <h5>INFORMACIÓN PERSONAL</h5>
        <form action="" className="formRClientes" id="formClientes">
          {/**value conecta el input con el estado y onChange detecta cambios en el valor */}
          <input
            type="text"
            placeholder="Nombres*"
            name="nombres"
            value={huesped.nombres}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="apellidos"
            placeholder="Apellidos*"
            value={huesped.apellidos}
            onChange={handleChange}
            required
          />
          <select
            name="tipoDocto"
            className="tipoDoc"
            value={huesped.tipoDocto}
            onChange={handleChange}
          >
            <option value="">Tipo de documento</option>
            <option value="cc">Cedula de ciudadanía</option>
            <option value="ce">Cedula de extrangería</option>
            <option value="ti">Targeta de identidad</option>
          </select>
          <input
            type="text"
            placeholder="Número de documento*"
            name="numDoc"
            value={huesped.numDoc}
            onChange={handleChange}
            required
          />
          <input
            type="tel"
            placeholder="Telefono*"
            name="telefono"
            value={huesped.telefono}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            placeholder="Ocupación"
            name="ocupacion"
            value={huesped.ocupacion}
            onChange={handleChange}
          />
          <hr />
          <div className="infoHabitación">
            <h5>INFORMACIÓN DE ESTADÍA</h5>
            <div className="estadia">
              <div className="dFechas">
                <label htmlFor="fEntrada">Fecha de entrada</label>
                <input
                  type="date"
                  name="fechaEntrada"
                  id="fEntrada"
                  value={huesped.fechaEntrada}
                  onChange={handleChange}
                  className="fecha"
                />
              </div>
              <div className="dFechas">
                <label htmlFor="fSalida">Fecha de salída</label>
                <input
                  type="date"
                  name="fechaSalida"
                  id="fSalida"
                  value={huesped.fechaSalida}
                  onChange={handleChange}
                  className="fecha"
                />
              </div>
              <select
                name="habitacion"
                value={huesped.habitacion}
                onChange={handleChange}
                className="tipoHab"
              >
                <option value="">Tipo de habitación</option>
                <option value="sencillaA">Sencilla/ventilador</option>
                <option value="sencillaV">Sencilla/aire</option>
                <option value="dobleV">Doble/ventilador</option>
                <option value="dobleA">Doble/aire</option>
                <option value="doscamas">Dos camas</option>
              </select>
            </div>
          </div>
        </form>
        <div className="botones">
          <button type="button" className="boton" onClick={limpiarFormulario}>
            Cancelar
          </button>
          <button
            type="button"
            className="boton"
            //al hacer click ejecuta la funcion guardar
            onClick={guardar}
          >
            Guardar
          </button>
        </div>
      </div>
    </div>
  );
}

export default RegistroH;
