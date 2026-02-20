<?php

require_once "config/database.php";

class Task {

    private $conn;

    public function __construct() {
        $database = new Database();
        $this->conn = $database->connect();
    }

    public function getByUser($user_id) {

        $query = "
        SELECT 
            t.id,
            t.description,
            t.hours,
            p.name AS project,
            upr.rate,
            (t.hours * upr.rate) AS total_value
        FROM tasks t
        INNER JOIN projects p ON t.project_id = p.id
        INNER JOIN user_project_rates upr 
            ON upr.project_id = t.project_id 
            AND upr.user_id = t.user_id
        WHERE t.user_id = :user_id
        ";

        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(":user_id", $user_id);
        $stmt->execute();

        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function create($user_id, $project_id, $description, $hours) {
        try {
            $query = "
            INSERT INTO tasks (user_id, project_id, description, hours) 
            VALUES (:user_id, :project_id, :description, :hours)
            ";
            $stmt = $this->conn->prepare($query);
            $stmt->bindParam(":user_id", $user_id);
            $stmt->bindParam(":project_id", $project_id);
            $stmt->bindParam(":description", $description);
            $stmt->bindParam(":hours", $hours);
            
            if ($stmt->execute()) {
                return [
                    "success" => true,
                    "id" => $this->conn->lastInsertId(),
                    "message" => "Tarea creada exitosamente"
                ];
            }
        } catch(PDOException $e) {
            return ["error" => $e->getMessage()];
        }
    }
}

?>
