import "../styles/notificacion.css"

function Notificacion({ mensaje, tipo }) {
  if (!mensaje) return null;
  return <div className={`notif ${tipo}`}>{mensaje}</div>;
} //es una funcion que muestra por medio de la variable mensaje lo que llega desde registro.jsx

export default Notificacion;
