<?php

// ============================================
// CONFIGURACIÓN CORS - PROFESIONAL Y SEGURA
// ============================================

// Permitir requests desde el frontend (localhost:3000)
$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
$allowedOrigins = [
    'http://localhost:3000',
    'http://localhost:3001',
    'http://127.0.0.1:3000',
    'http://127.0.0.1:3001',
];

if (in_array($origin, $allowedOrigins)) {
    header("Access-Control-Allow-Origin: " . $origin);
} else {
    header("Access-Control-Allow-Origin: *");
}

// Headers CORS completos
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Credentials: true");
header("Content-Type: application/json; charset=utf-8");

// ============================================
// MANEJAR SOLICITUDES PREFLIGHT OPTIONS
// ============================================

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// ============================================
// RUTEAR SOLICITUD (GET, POST, etc.)
// ============================================

require_once "core/Router.php";

$router = new Router();
$router->run();

?>