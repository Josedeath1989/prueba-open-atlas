<?php
class Database {

    private $config;
    public $conn;

    public function __construct() {
        $this->loadConfig();
    }

    private function loadConfig() {
        $xml = simplexml_load_file(__DIR__ . "/database.xml");

        if (!$xml) {
            die(json_encode(["error" => "No se pudo cargar el archivo de configuración, y no se puede conectar a la base de datos."]));
        }

        $this->config = [
            "host" => (string)$xml->host,
            "dbname" => (string)$xml->dbname,
            "username" => (string)$xml->username,
            "password" => (string)$xml->password
        ];
    }

    public function connect() {
        $this->conn = null;

        try {
            $this->conn = new PDO(
                "mysql:host={$this->config['host']};dbname={$this->config['dbname']}",
                $this->config['username'],
                $this->config['password']
            );

            $this->conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        } catch(PDOException $e) {
            die(json_encode(["error" => $e->getMessage()]));
        }

        return $this->conn;
    }
}
