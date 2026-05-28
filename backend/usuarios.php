
<?php //endpoint o ruta para el registro de usuarios.
#1. incluimos el archivo de la conexión
require_once 'db.php'; //es como importar el archivo que contiene la conexión.

#2.recibimos los datos que react envia en formato json
$body = json_decode(file_get_contents('php://input'), true); //convierte los datos de json a array php para que puedan ser usados.

#3.creamos la función respond para responder a react con json y un codigo http.
//creamos la función que se encargará de dar respuesta.
//y le pasamos como parametro $data , variable con la respuesta solicitada y int $code = 200 el codigo que queda por defecto. y :void significa que no retorna nada, solo se ejecuta.
function respond($data, int $code = 200): void
{
    header('Content-Type: application/json; chaset=utf-8'); //esta dice que la respuesta llega en formato json.
    http_response_code(($code)); //envia el codigo por defecto establecido dentro de los parametros de la función.
    echo json_encode($data, JSON_UNESCAPED_UNICODE); //esta linea convierte los datos a json y los envia a react. por eso le pasa la variable $data y json_unescapedd_unicode es para que interprete como letras las tildes y las ñ.
    exit(); //detiene todo el programa luego de ejecutarse el codigo.
}
#4.validamos que no quedaron campos sin diligenciar.
//ahora para asegurarnos de que ningun campo venga vacío 
if (empty($body['nombres']) || empty($body['apellidos']) || empty($body['telefono']) || empty($body['usuario']) || empty($body['contrasena'])) {
    respond(['error' => 'Todos los campos son obligatorios'], 400);
}//esto verifica que todos los campos del registro esten diligenciados/ llenos.

#5. encriptamos la contraseña para que se guarde encriptada. se debe hacer antes de guardar los datos en mysql.  la contraseña nunca se guarda tal cual en el mysql, siempre se encripta y luego se guarda.

//usamos la función que encripta texto llamada password_hash() y le pasamos la variable $body que contiene los datos que vienen desde react y le especificamos el indice contrasena y finalmente usamos el algoritmo de encriptación mas usado: password_bcrypt
$contrasenaEncriptada = password_hash($body['contrasena'], PASSWORD_BCRYPT);

#6. verificas que el usuario que llega no existe ya en la base de datos.

#se le hace una pregunta a mysql, ya exites este usuario en la base de datos?
$verificar = $pdo->prepare("select id from usuarios where usuario = ?"); //$pdo->prepare prepara una consulta sql, (busca el la tabla de usuarios donde usuario sea igual a el usuario que acaba de ingresar)
$verificar->execute([$body['usuario']]);//execute, ejecuta la consulta preparada arriba (reemplaza el ? con el usuario ingresado.)
$usuarioExiste = $verificar->fetch(); //fetch trae el resultado de la consulta, si exite trae sus datos y si no devuelve un false.

#ahora usamos un if para decirle que hacer en caso de que exista o no el usuario.
if($usuarioExiste){
    respond(["error" => "El usuario ya existe, intente con uno diferente.", 400]);
}

#para guardar el usuario
#creamos una variable guardar y hacemos la consulta
$guardar = $pdo->prepare("INSERT INTO usuarios (nombres, apellidos, telefono, usuario, contrasena) VALUES (?, ?, ?, ?, ?)");

$guardar->execute([
$body['nombres'], 
$body['apellidos'], 
$body['telefono'],
$body['usuario'] , 
$contrasenaEncriptada
]);#cada valor reemplaza un ? y al final, contrasenaEncriptada reemplaza ese valor por la contraseña encriptada.

respond(['mensaje' => 'Usuario registrado correctamente.'], 201); 