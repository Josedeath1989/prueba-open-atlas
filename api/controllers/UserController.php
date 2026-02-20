<?php

require_once "models/User.php";

class UserController {

    private $user;

    public function __construct() {
        $this->user = new User();
    }

    public function list() {
        try {
            $data = $this->user->getAll();
            echo json_encode($data);
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(["error" => $e->getMessage()]);
        }
    }

    public function create() {
        try {
            $input = json_decode(file_get_contents('php://input'), true);

            if (!$input || !isset($input['name']) || !isset($input['email'])) {
                http_response_code(400);
                echo json_encode(["error" => "Todos los campos son requeridos"]);
                return;
            }

            // Validaciones básicas
            $name = trim($input['name']);
            $email = trim($input['email']);

            if (empty($name) || empty($email)) {
                http_response_code(400);
                echo json_encode(["error" => "Nombre y email no pueden estar vacíos"]);
                return;
            }

            if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
                http_response_code(400);
                echo json_encode(["error" => "Email inválido"]);
                return;
            }

            $result = $this->user->create($name, $email);
            
            if (isset($result['error'])) {
                http_response_code(400);
            } else {
                http_response_code(201);
            }
            
            echo json_encode($result);
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(["error" => $e->getMessage()]);
        }
    }

    public function index() {
        echo json_encode(["message" => "UserController API"]);
    }
}

?>
