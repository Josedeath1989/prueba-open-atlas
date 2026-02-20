<?php

class Router {

    public function run() {

        $url = $_GET['url'] ?? '';
        $url = explode('/', trim($url, '/'));

        $controllerName = !empty($url[0]) ? ucfirst($url[0]) . "Controller" : "TaskController";
        $method = $url[1] ?? "index";
        $param = $url[2] ?? null;

        $controllerPath = "controllers/" . $controllerName . ".php";

        if (!file_exists($controllerPath)) {
            http_response_code(404);
            echo json_encode(["error" => "Controller no encontrado"]);
            return;
        }

        require_once $controllerPath;

        $controller = new $controllerName();

        if (!method_exists($controller, $method)) {
            http_response_code(404);
            echo json_encode(["error" => "Método no encontrado"]);
            return;
        }

        // Llamar al método con parámetro si es necesario
        if ($param) {
            $controller->$method($param);
        } else {
            $controller->$method();
        }
    }
}

?>
