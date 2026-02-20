<?php

require_once "models/Rate.php";

class RateController {

    private $rate;

    public function __construct() {
        $this->rate = new Rate();
    }

    public function list() {
        try {
            $data = $this->rate->getAll();
            echo json_encode($data);
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(["error" => $e->getMessage()]);
        }
    }

    public function create() {
        try {
            $input = json_decode(file_get_contents('php://input'), true);

            if (!$input || !isset($input['user_id']) || !isset($input['project_id']) || !isset($input['rate'])) {
                http_response_code(400);
                echo json_encode(["error" => "id usuario, id proyecto y tarifa son requeridos"]);
                return;
            }

            $user_id = intval($input['user_id']);
            $project_id = intval($input['project_id']);
            $rate = floatval($input['rate']);

            if ($user_id <= 0 || $project_id <= 0 || $rate <= 0) {
                http_response_code(400);
                echo json_encode(["error" => "Valores deben ser números positivos"]);
                return;
            }

            $result = $this->rate->create($user_id, $project_id, $rate);
            
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
        echo json_encode(["message" => "RateController API"]);
    }
}

?>
