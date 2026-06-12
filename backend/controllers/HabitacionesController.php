<?php
require_once __DIR__ . '/../config/db.php';
require_once __DIR__ . '/../helpers/Respond.php';

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Type");

$method = $_SERVER['REQUEST_METHOD'];
//si react esta usando metodo getn o sea solicitando datos
if ($method === 'GET') {
    //creo una consulta para obtener las habitaciones
    $sql = 'select * from habitaciones';
    //y prepara la consulta
    $consulta = $pdo->prepare($sql);
    //ejecuta la consulta
    $consulta->execute();
    //obtiene las filas de habitaciones y las guarda en array 
    $habitaciones = $consulta->fetchAll(PDO::FETCH_ASSOC);

    //convierte en json y ENVIALO A REACT
    Respond($habitaciones);
}
//si el metodo que viene de react es post entonces
if ($method === 'POST') {
    //lee lo que viene, conviertelo en array php y luego guardalo en la variable data
    $data = json_decode(file_get_contents('php://input'), true);

    //luego guarda cada dato que viene en una variable
    $numero_habitacion = $data['numero_habitacion'];
    $tipo_habitacion = $data['tipo_habitacion'];
    $estado = $data['estado'];
    $precio = $data['precio'];


    $sql = 'INSERT INTO habitaciones
    (numero_habitacion, tipo_habitacion, estado, precio) VALUES (?,?,?,?)';

    //preparo la consulta
    $consulta = $pdo->prepare($sql);

    //ejecuto la consulta
    $consulta->execute([
        $numero_habitacion,
        $tipo_habitacion,
        $estado,
        $precio

    ]);

    Respond(['mensaje' => 'Habitación creada correctamente']);
}
//metodo editar
if ($method === 'PUT') {
    //LEO LO QUE TRAE REACT
    $data = json_decode(file_get_contents('php://input'), true);

    $id = $data['id'];
    $numero_habitacion = $data['numero_habitacion'];
    $tipo_habitacion = $data['tipo_habitacion'];
    $estado = $data['estado'];
    $precio = $data['precio'];

    //hago la consulta
    $sql = 'UPDATE habitaciones SET numero_habitacion = ?,
    tipo_habitacion = ?,
    estado = ?,
    precio = ? WHERE id = ?';

    //preparo la consulta
    $consulta = $pdo->prepare($sql);

    //ejecuto la consulta
    $consulta->execute(
        [
            $numero_habitacion,
            $tipo_habitacion,
            $estado,
            $precio,
            $id
        ]
    );

    Respond(['mensaje' => 'La habitacion ha sido actualizada correctamente']);
}
// metodo eliminar (delete) para delete solo necesito el id de el elemento en tabla.
if ($method === 'DELETE') {
    //LEO LO QUE VIENE DE REACT 
    $data = json_decode(file_get_contents('php://input'), true);

    //y guardo solo la variable que voy a usar
    $id = $data['id'];

    //creo la orden para sql
    $sql = 'DELETE FROM habitaciones WHERE id = ?';
    //preparo la consulta y la guardo en un variable
    $consulta = $pdo->prepare($sql);

    //ejecuto la consulta y detro le pongo los campos que quiero que se puedar editar/borrar
    $consulta->execute([
        $id

    ]);

    //finalmente doy una respuesta
    Respond(['mensaje' => 'La habitación se ha borrado correctamente']);
}
