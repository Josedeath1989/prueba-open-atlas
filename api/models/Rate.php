<?php

require_once "config/database.php";

class Rate {

    private $conn;

    public function __construct() {
        $database = new Database();
        $this->conn = $database->connect();
    }

    public function getAll() {
        $query = "
        SELECT 
            upr.id,
            upr.user_id,
            u.name AS user_name,
            upr.project_id,
            p.name AS project_name,
            upr.rate,
            upr.created_at
        FROM user_project_rates upr
        INNER JOIN users u ON upr.user_id = u.id
        INNER JOIN projects p ON upr.project_id = p.id
        ORDER BY u.name, p.name
        ";
        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function create($user_id, $project_id, $rate) {
        try {
            $query = "
            INSERT INTO user_project_rates (user_id, project_id, rate) 
            VALUES (:user_id, :project_id, :rate)
            ON DUPLICATE KEY UPDATE rate = :rate
            ";
            $stmt = $this->conn->prepare($query);
            $stmt->bindParam(":user_id", $user_id);
            $stmt->bindParam(":project_id", $project_id);
            $stmt->bindParam(":rate", $rate);
            
            if ($stmt->execute()) {
                return [
                    "success" => true,
                    "message" => "Tarifa creada exitosamente"
                ];
            }
        } catch(PDOException $e) {
            return ["error" => $e->getMessage()];
        }
    }
}

?>
