<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

include_once "../config/database.php";

$database = new Database();
$db = $database->connect();

$user_id = $_GET['user_id'] ?? null;

if (!$user_id) {
    echo json_encode(["error" => "Debe enviar id de usuario"]);
    exit;
}

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

$stmt = $db->prepare($query);
$stmt->bindParam(":user_id", $user_id);
$stmt->execute();

$result = $stmt->fetchAll(PDO::FETCH_ASSOC);

echo json_encode($result);
