<?php

require_once "config/database.php";

class Project {

    private $conn;

    public function __construct() {
        $database = new Database();
        $this->conn = $database->connect();
    }

    public function getAll() {
        $query = "SELECT id, name, description, created_at FROM projects ORDER BY name ASC";
        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function create($name, $description = '') {
        try {
            $query = "INSERT INTO projects (name, description) VALUES (:name, :description)";
            $stmt = $this->conn->prepare($query);
            $stmt->bindParam(":name", $name);
            $stmt->bindParam(":description", $description);
            
            if ($stmt->execute()) {
                return [
                    "success" => true,
                    "id" => $this->conn->lastInsertId(),
                    "message" => "proyecto creado exitosamente"
                ];
            }
        } catch(PDOException $e) {
            return ["error" => $e->getMessage()];
        }
    }
}

?>
