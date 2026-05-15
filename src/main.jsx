import { BrowserRouter} from "react-router-dom"; /**este lo importamos para decirle al navegador que vamos a usar rutas */
/*import { StrictMode } from "react";*/
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import "./index.css"; //estilos globales

createRoot(document.getElementById("root")).render(
  
    //<StrictMode>
      <BrowserRouter>
      <App />
      </BrowserRouter>
    //</StrictMode>
  
);
