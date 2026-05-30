<?php
//creamos la función respond para responder a react con json y un codigo http.
//creamos la función que se encargará de dar respuesta.
//y le pasamos como parametro $data , variable con la respuesta solicitada y int $code = 200 el codigo que queda por defecto. y :void significa que no retorna nada, solo se ejecuta.

function Respond($data, int $code = 200): void
{
    header('Content-Type: application/json; chaset=utf-8'); //esta dice que la respuesta llega en formato json.
    http_response_code(($code)); //envia el codigo por defecto establecido dentro de los parametros de la función.
    echo json_encode($data, JSON_UNESCAPED_UNICODE); //esta linea convierte los datos a json y los envia a react. por eso le pasa la variable $data y json_unescapedd_unicode es para que interprete como letras las tildes y las ñ.
    exit(); //detiene todo el programa luego de ejecutarse el codigo.
}