<?php

#conexiones
require_once __DIR__ . '/../config/db.php';
require_once __DIR__ . '/../helpers/Respond.php';

#obtengo el id enviado desde el react
$id = $_GET['id'] ?? null; #busca el valor llamado id, si existe lo guardas en la variable y si no guarda un null

#verificacion de lo que llego de react 
#si lo que hay dentro de la variable id no es un id entonces no fue exitoso y da el mensaje. luego para todo con exit.

if (!$id) {
    echo json_encode([
        'success' => false,
        'mensaje' => 'No se recibió el id del huésped'
    ]);
    exit;
}

#creo la consulta sql
$sql = 'UPDATE huespedes
SET check_out = NOW()
WHERE id = ?';

#prepara la consulta para agregar un valor en la columna de check_out
$peticion = $pdo->prepare($sql);

//ejecuta la consulta
$respuesta = $peticion->execute([$id]);

// obtener el numero de habitacion del huesped que hizo check-out
$buscarHab = $pdo->prepare('SELECT numeroHabitacion FROM huespedes WHERE id = ?');
$buscarHab->execute([$id]);
$huesped = $buscarHab->fetch(PDO::FETCH_ASSOC);

// actualizar el estado de esa habitacion a en mantenimiento
if ($huesped) {
    $actualizarHab = $pdo->prepare("UPDATE habitaciones SET estado = 'en mantenimiento' WHERE numero_habitacion = ?");
    $actualizarHab->execute([$huesped['numeroHabitacion']]);
}

#responder al front
echo json_encode(['success' => $respuesta]);
