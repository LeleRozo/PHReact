import { useState, useEffect } from "react";
import "../styles/gestionHuespedes.css";
import { Link } from "react-router-dom";

function GestionHuespedes() {
  //creo los estado para guardar la información que viene del backend
  const [huespedes, setHuespedes] = useState([]);

  //creo un arreglo con huespedes en donde check_out sea vacio
  const huespedesActivos = huespedes.filter(
    (huesped) => huesped.check_out === null,
  );

  //creo otro arreglo donde check_out NO este vació
  const historial = huespedes.filter((huesped) => huesped.check_out !== null);

  //hacemos la funcion del botón check_out
  const realizarCheckOut = async (id) => {
    try {
      //enviar el id del huésped al backend
      const respuesta = await fetch(`/api/checkOut?id=${id}`, {
        method: "PUT",
      });

      //convertir la respuesta a JSON
      const data = await respuesta.json();

      console.log(data);
      //si el check_out fue exitoso,
      //volver a cargar la lista de huespedes
      if (data.success) {
        cargarHuespedes();
      }
    } catch (error) {
      //mostrar error en la consola
      console.error(error);
    }
  };

  //useEffect para decir ejecuta este codigo que pongo dentro cuando se abra esta pagina y los corchetes vacios para decirle que se ejecute una sola vez.
  //la ruta del fetch es la que debe coincidir con la que puse en el index.php
  //dentro del useEffect dice, ve a esta ruta luego trae lo que tenga el servidor y finalmente conviertelo a arreglo json

  const cargarHuespedes = () => {
    fetch("/api/huespedesActivos")
      .then((respuesta) => respuesta.json())
      //luego guarda los datos recibidos en el estado de Huespedes
      .then((data) => {
        console.log(data);
        setHuespedes(data);
      });
  };
  //ejecutar la carga luego de abrir la vista
  useEffect(() => {
    cargarHuespedes();
  }, []);

  return (
    <div className="contPrincipal">
      <button className="buton">
        <Link to="/home">Home</Link>
      </button>
      <h3>HUÉSPEDES ACTIVOS</h3>

      {/**encabezados */}
      <div className="filaEncabezados">
        <span>Nombres</span>
        <span>Apellidos</span>
        <span>Numero de habitación</span>
        <span>Check_In</span>
        <span>Check_Out</span>
      </div>
      <hr />
      {/**por cada huesped crea una fila */}
      {huespedesActivos.map((huesped) => (
        <div className="filaHuesped" key={huesped.id}>
          <span>{huesped.nombres}</span>
          <span>{huesped.apellidos}</span>
          <span>{huesped.numeroHabitacion}</span>
          <span>{huesped.check_in}</span>
          <span>
            <img
              src="/src/assets/mapas-y-banderas.png"
              alt="check-out"
              className="btno"
              onClick={() => realizarCheckOut(huesped.id)}
            />
          </span>
        </div>
      ))}
      <h3>HISTORIAL DE HUÉSPEDES</h3>
      {/**encabezados */}
      <div className="filaEncabezados">
        <span>Nombres</span>
        <span>Apellidos</span>
        <span>Numero de habitación</span>
        <span>Check_In</span>
        <span>Check_Out</span>
      </div>
      <hr />
      {/**por cada huesped crea una fila */}
      {historial.map((huesped) => {
        console.log(huesped);

        return (
          <div className="filaHuesped" key={huesped.id}>
            <span>{huesped.nombres}</span>
            <span>{huesped.apellidos}</span>
            <span>{huesped.numeroHabitacion}</span>
            <span>{huesped.check_in}</span>
            <span>{huesped.check_out}</span>
          </div>
        );
      })}
    </div>
  );
}
export default GestionHuespedes;
