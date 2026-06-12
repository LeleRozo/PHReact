<?php #ENDPOINT PARA MOSTRAR USUARIOS REGISTRADOS ACTIVOS.
require_once __DIR__ . '/../config/db.php';
require_once __DIR__ . '/../helpers/Respond.php';

#creamos un variable y ahi dentro guardamos los huespedes que tienen vacio el campo check_out
$peticion = $pdo->query("SELECT * FROM huespedes ORDER BY check_in DESC");

#toma los resultados de la peticion anterior y guardalos dentro de la variable hActivo como un arreglo que react entienda.
$hActivo = $peticion->fetchAll(PDO::FETCH_ASSOC);

#finalmente, envia lo contenido en la variable hActivo a react.
Respond($hActivo);