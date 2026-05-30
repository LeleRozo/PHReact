<?php
require_once __DIR__ . '/../config/db.php';
require_once __DIR__ . '/../helpers/Respond.php';

#1.leer los datos que el usuario ingresó al login
#creo la variable $body y dentro guardo lo que el usuario ingresó a los inputs del login.
$body = json_decode(file_get_contents('php://input'), true);

#2. ahora valido que los campos no vengan vacíos
if(empty($body['usuario']) || empty($body['contrasena'])){
    Respond(['error' => 'Todos los campos deben estar llenos'], 400);
}

#si todos los campos estan llenos, se salta esa condicional y empieza a buscar el usuario en mysql
#3. preparo una petición al sql y le digo que agarre toda la tabla usuarios y me traiga la informacion dentro de la columna usuario y eso lo meto en una variable llamada buscar.
$buscar = $pdo -> prepare("SELECT * FROM usuarios WHERE usuario = ? ");

#ejecuto la peticion preparada y le digo que me reemplace el ? por lo que ingresó en el body en el input usuario.
$buscar->execute([$body['usuario']]);

#entonces traeme lo que encontraste y metelo en la variable usuario
$usuario = $buscar->fetch();

#si usuario es false, da un error y di esto.
if(!$usuario){
    Respond(['error' => 'Usuario o contraseña inconrrectos'],401);
}

#si la contraseña recien ingresada no coincide con la contraseña encriptada que tiene ese usuario en la db entonces da un error y di: 
if(!password_verify($body['contrasena'], $usuario['contrasena'])){
    Respond(['error' => 'Usuario o contraseña incorrectos'], 401);
}else{ 
    Respond(['mensaje' => "Autenticación satisfactoria", 'usuario' => $usuario], 200);
}#encambio si si coinciden, da el mensaje autenticación satisfactoria y enviale a react los datos del usuario autenticado