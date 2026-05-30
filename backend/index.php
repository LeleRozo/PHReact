<?php
#a esta ruta llegan las peticiones y de aqui el index las redirige segun el url que traiga la peticion
header('Access-Control-Allow-Origin: *'); #le dice al navegador que: acepte peticiones de cualquier puerto u origen
header('Access-Control-Allow-Methods: POST, GET, OPTIONS, PUT, DELETE'); #acepta estos metodos http
header('Access-Control-Allow-Headers: Content-Type'); #acepta los headers en las peticiones

require_once __DIR__ . '/helpers/Respond.php';
require_once __DIR__ . '/config/db.php';
#inicialmente el navegador pregunta si puede  enviar datos a esa api y php le responde que si, y luego para todo.
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit(); #para todo
}

$method = $_SERVER['REQUEST_METHOD']; #se guarda el metodo que viene
$uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH); #la url del cliente 
$uri = rtrim($uri, '/'); #quita el slash del final para que en ves de quedar ej: /cliente/ quede /cliente

#si la ruta que escribió el cliente es /usuarios entonces ejecuta el controller usuariosController.
if ($uri === '/usuarios') {
    require_once __DIR__ . '/controllers/UsuariosController.php';
} else if ($uri === '/login') {
    require_once __DIR__ . '/controllers/LoginController.php';
} else {
    Respond(['error' => 'Ruta no encontrada'], 404);
}#por si se pone una ruta no especificada en el navegador