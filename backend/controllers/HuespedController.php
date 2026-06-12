<?php //endpoint o ruta para el registro de huespedes
require_once __DIR__ . '/../config/db.php';
require_once __DIR__ . '/../helpers/Respond.php';
$body = json_decode(file_get_contents('php://input'), true);
if (empty($body['nombres']) || empty($body['apellidos']) || empty($body['tipoDocumento']) || empty($body['numeroDocumento']) || empty($body['tipoHabitacion']) || empty($body['numeroHabitacion'])) {
    Respond(['error' => 'Todos los campos obligatorios * deben estar llenos'], 400);
}
$guardar = $pdo->prepare("INSERT INTO huespedes (nombres, apellidos, tipoDocumento, numeroDocumento, telefono, ocupacion, tipoHabitacion, numeroHabitacion) VALUES (?,?,?,?,?,?,?,?)");

$guardar->execute([
    $body['nombres'],
    $body['apellidos'],
    $body['tipoDocumento'],
    $body['numeroDocumento'],
    $body['telefono'] ?? null,
    $body['ocupacion'] ?? null,
    $body['tipoHabitacion'],
    $body['numeroHabitacion'],

]);

Respond(['mensaje' => 'Huesped registrado correctamente'], 201);
