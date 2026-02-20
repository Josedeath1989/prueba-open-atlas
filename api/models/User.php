<?php

require_once "config/database.php";

class User {

    private $conn;

    public function __construct() {
        $database = new Database();
        $this->conn = $database->connect();
    }

    public function getAll() {
        $query = "SELECT id, name, email, created_at FROM users ORDER BY name ASC";
        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function create($name, $email) {
        try {
            $query = "INSERT INTO users (name, email) VALUES (:name, :email)";
            $stmt = $this->conn->prepare($query);
            $stmt->bindParam(":name", $name);
            $stmt->bindParam(":email", $email);
            
            if ($stmt->execute()) {
                return [
                    "success" => true,
                    "id" => $this->conn->lastInsertId(),
                    "message" => "Usuario creado exitosamente"
                ];
            }
        } catch(PDOException $e) {
            return ["error" => $e->getMessage()];
        }
    }
}

?>
