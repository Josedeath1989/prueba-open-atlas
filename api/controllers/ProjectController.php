<?php

require_once "models/Project.php";

class ProjectController {

    private $project;

    public function __construct() {
        $this->project = new Project();
    }

    public function list() {
        try {
            $data = $this->project->getAll();
            echo json_encode($data);
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(["error" => $e->getMessage()]);
        }
    }

    public function create() {
        try {
            $input = json_decode(file_get_contents('php://input'), true);

            if (!$input || !isset($input['name'])) {
                http_response_code(400);
                echo json_encode(["error" => "El nombre del proyecto es requerido"]);
                return;
            }

            $name = trim($input['name']);
            $description = trim($input['description'] ?? '');

            if (empty($name)) {
                http_response_code(400);
                echo json_encode(["error" => "El nombre no puede estar vacío"]);
                return;
            }

            $result = $this->project->create($name, $description);
            
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
        echo json_encode(["message" => "ProjectController API"]);
    }
}

?>
