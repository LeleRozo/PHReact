
<?php //endpoint o ruta para el registro de usuarios.
#1. incluimos el archivo de la conexión
require_once __DIR__ . '/../config/db.php';
require_once __DIR__ . '/../helpers/Respond.php';

#2.recibimos los datos que react envia en formato json
$body = json_decode(file_get_contents('php://input'), true); //convierte los datos de json a array php para que puedan ser usados.

#4.validamos que no quedaron campos sin diligenciar.
//ahora para asegurarnos de que ningun campo venga vacío 
if (empty($body['nombres']) || empty($body['apellidos']) || empty($body['telefono']) || empty($body['usuario']) || empty($body['contrasena'])) {
    Respond(['error' => 'Todos los campos son obligatorios'], 400);
} //esto verifica que todos los campos del registro esten diligenciados/ llenos.

#5. encriptamos la contraseña para que se guarde encriptada. se debe hacer antes de guardar los datos en mysql.  la contraseña nunca se guarda tal cual en el mysql, siempre se encripta y luego se guarda.

//usamos la función que encripta texto llamada password_hash() y le pasamos la variable $body que contiene los datos que vienen desde react y le especificamos el indice contrasena y finalmente usamos el algoritmo de encriptación mas usado: password_bcrypt
$contrasenaEncriptada = password_hash($body['contrasena'], PASSWORD_BCRYPT);

#6. verificas que el usuario que llega no existe ya en la base de datos.

#se le hace una pregunta a mysql, ya exites este usuario en la base de datos?
$verificar = $pdo->prepare("select id from usuarios where usuario = ?"); //$pdo->prepare prepara una consulta sql, (busca el la tabla de usuarios donde usuario sea igual a el usuario que acaba de ingresar)
$verificar->execute([$body['usuario']]); //execute, ejecuta la consulta preparada arriba (reemplaza el ? con el usuario ingresado.)
$usuarioExiste = $verificar->fetch(); //fetch trae el resultado de la consulta, si exite trae sus datos y si no devuelve un false.

#ahora usamos un if para decirle que hacer en caso de que exista o no el usuario.
if ($usuarioExiste) {
    Respond(["error" => "El usuario ya existe, intente con uno diferente."], 400);
}

#para guardar el usuario
#creamos una variable guardar y hacemos la consulta
$guardar = $pdo->prepare("INSERT INTO usuarios (nombres, apellidos, telefono, usuario, contrasena) VALUES (?, ?, ?, ?, ?)");

$guardar->execute([
    $body['nombres'],
    $body['apellidos'],
    $body['telefono'],
    $body['usuario'],
    $contrasenaEncriptada
]); #cada valor reemplaza un ? y al final, contrasenaEncriptada reemplaza ese valor por la contraseña encriptada.

Respond(['mensaje' => 'Usuario registrado correctamente.'], 201);
