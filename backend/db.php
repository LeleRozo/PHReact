<?php // conexión a la base de datos creada en mysql

//ahora guardo los datos de la conexión en variables, las variables en php se nombran usando el simbolo $nombreVariable.
$host = 'localhost'; //osea en mi propia maquina, una db local.
$dbname = 'usuarios_hotel'; // nombre de la base de datos creada para el proyecto
$user = 'root'; //el usuario de mysql por defecto es root
$password = 'leydy.2026';
try{
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8", $user, $password);
    } //try dice, intenta ejecutar el codigo dentro de las llaves y si algo falla manejalo con el catch
    //PDO es una clase de php que habla con mysqly se le pasan 3 datos: le dice donde esta mysql, que base de datos es la que debe usar y que soporte las tíldes. y al final pasa variables de usuario y contraseña para que pueda acceder a la base de datos. y el resultado de todo se guarda en la variable $pdo.
catch (PDOException $e){
    die("Error de conexión: " . $e ->getMessage());
}//si la conexión falla por lo que sea, entra a $e que es la variable que contiene información del error
//die, detiede todo y muestra el mensaje de error.