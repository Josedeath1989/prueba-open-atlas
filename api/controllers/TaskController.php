<?php

require_once "models/Task.php";

class TaskController {

    private $task;

    public function __construct() {
        $this->task = new Task();
    }

    public function index() {
        echo json_encode(["message" => "API funcionando correctamente"]);
    }

    public function byUser($user_id = null) {
        try {
            if (!$user_id) {
                http_response_code(400);
                echo json_encode(["error" => "Debe enviar el id del usuario"]);
                return;
            }

            $data = $this->task->getByUser($user_id);
            echo json_encode($data);
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(["error" => $e->getMessage()]);
        }
    }

    public function create() {
        try {
            $input = json_decode(file_get_contents('php://input'), true);

            if (!$input || !isset($input['user_id']) || !isset($input['project_id']) || 
                !isset($input['description']) || !isset($input['hours'])) {
                http_response_code(400);
                echo json_encode(["error" => "Todos los campos son requeridos"]);
                return;
            }

            // Validaciones
            $user_id = intval($input['user_id']);
            $project_id = intval($input['project_id']);
            $description = trim($input['description']);
            $hours = floatval($input['hours']);

            if (empty($description) || $hours <= 0) {
                http_response_code(400);
                echo json_encode(["error" => "Descripción y horas deben ser válidas"]);
                return;
            }

            $result = $this->task->create($user_id, $project_id, $description, $hours);
            
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
}

?>