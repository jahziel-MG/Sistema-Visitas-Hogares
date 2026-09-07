<?php

require_once __DIR__ . '/../config/database.php';

header('Content-Type: application/json; charset=utf-8');

$metodo = $_SERVER['REQUEST_METHOD'];

try {

    // ==========================================
    // GET
    // ==========================================

    if ($metodo === 'GET') {

        // Obtener un estudiante por ID
        if (isset($_GET['id'])) {

            $id = (int) $_GET['id'];

            $sql = "SELECT
                        id_estudiante,
                        apellidos,
                        nombres,
                        dni,
                        grado,
                        seccion,
                        direccion,
                        zona,
                        distrito,
                        telefono_fijo,
                        fecha_nacimiento,
                        lugar_como_hijo,
                        total_hermanos_casa,
                        con_quien_vive,
                        creado_en,
                        actualizado_en
                    FROM estudiantes
                    WHERE id_estudiante = :id";

            $stmt = $conexion->prepare($sql);

            $stmt->execute([
                ':id' => $id
            ]);

            $alumno = $stmt->fetch();

            if (!$alumno) {

                http_response_code(404);

                echo json_encode([
                    "success" => false,
                    "message" => "Estudiante no encontrado."
                ]);

                exit;
            }

            echo json_encode([
                "success" => true,
                "data" => $alumno
            ]);

            exit;
        }


        // Listar todos
        $sql = "SELECT
                    id_estudiante,
                    apellidos,
                    nombres,
                    dni,
                    grado,
                    seccion,
                    direccion,
                    zona,
                    distrito,
                    telefono_fijo,
                    fecha_nacimiento,
                    lugar_como_hijo,
                    total_hermanos_casa,
                    con_quien_vive,
                    creado_en,
                    actualizado_en
                FROM estudiantes
                ORDER BY id_estudiante DESC";

        $stmt = $conexion->query($sql);

        echo json_encode([
            "success" => true,
            "data" => $stmt->fetchAll()
        ]);

        exit;
    }


    // ==========================================
    // POST
    // ==========================================

    if ($metodo === 'POST') {

        $datos = json_decode(
            file_get_contents("php://input"),
            true
        );

        if (!is_array($datos)) {

            http_response_code(400);

            echo json_encode([
                "success" => false,
                "message" => "Los datos enviados no tienen un formato JSON válido."
            ]);

            exit;
        }


        if (
            empty($datos['apellidos']) ||
            empty($datos['nombres']) ||
            empty($datos['grado']) ||
            empty($datos['seccion'])
        ) {

            http_response_code(400);

            echo json_encode([
                "success" => false,
                "message" => "Apellidos, nombres, grado y sección son obligatorios."
            ]);

            exit;
        }


        $sql = "INSERT INTO estudiantes (
                    apellidos,
                    nombres,
                    dni,
                    grado,
                    seccion
                ) VALUES (
                    :apellidos,
                    :nombres,
                    :dni,
                    :grado,
                    :seccion
                )";

        $stmt = $conexion->prepare($sql);

        $stmt->execute([
            ':apellidos' =>
                trim($datos['apellidos']),

            ':nombres' =>
                trim($datos['nombres']),

            ':dni' =>
                !empty($datos['dni'])
                    ? trim($datos['dni'])
                    : null,

            ':grado' =>
                trim($datos['grado']),

            ':seccion' =>
                trim($datos['seccion'])
        ]);


        echo json_encode([
            "success" => true,
            "message" =>
                "Estudiante registrado correctamente.",

            "id_estudiante" =>
                $conexion->lastInsertId()
        ]);

        exit;
    }


    // ==========================================
    // PUT
    // ==========================================

    if ($metodo === 'PUT') {

        if (!isset($_GET['id'])) {

            http_response_code(400);

            echo json_encode([
                "success" => false,
                "message" => "Falta el ID del estudiante."
            ]);

            exit;
        }


        $id = (int) $_GET['id'];


        $datos = json_decode(
            file_get_contents("php://input"),
            true
        );


        if (!is_array($datos)) {

            http_response_code(400);

            echo json_encode([
                "success" => false,
                "message" => "Los datos enviados no tienen un formato JSON válido."
            ]);

            exit;
        }


        if (
            empty($datos['apellidos']) ||
            empty($datos['nombres']) ||
            empty($datos['grado']) ||
            empty($datos['seccion'])
        ) {

            http_response_code(400);

            echo json_encode([
                "success" => false,
                "message" => "Apellidos, nombres, grado y sección son obligatorios."
            ]);

            exit;
        }


        $sql = "UPDATE estudiantes
                SET
                    apellidos = :apellidos,
                    nombres = :nombres,
                    dni = :dni,
                    grado = :grado,
                    seccion = :seccion
                WHERE id_estudiante = :id";


        $stmt = $conexion->prepare($sql);


        $stmt->execute([
            ':apellidos' =>
                trim($datos['apellidos']),

            ':nombres' =>
                trim($datos['nombres']),

            ':dni' =>
                !empty($datos['dni'])
                    ? trim($datos['dni'])
                    : null,

            ':grado' =>
                trim($datos['grado']),

            ':seccion' =>
                trim($datos['seccion']),

            ':id' => $id
        ]);


        echo json_encode([
            "success" => true,
            "message" =>
                "Estudiante actualizado correctamente."
        ]);

        exit;
    }


    // ==========================================
    // DELETE
    // ==========================================

    if ($metodo === 'DELETE') {

        if (!isset($_GET['id'])) {

            http_response_code(400);

            echo json_encode([
                "success" => false,
                "message" => "Falta el ID del estudiante."
            ]);

            exit;
        }


        $id = (int) $_GET['id'];


        $sql = "DELETE FROM estudiantes
                WHERE id_estudiante = :id";


        $stmt = $conexion->prepare($sql);


        $stmt->execute([
            ':id' => $id
        ]);


        if ($stmt->rowCount() === 0) {

            http_response_code(404);

            echo json_encode([
                "success" => false,
                "message" =>
                    "El estudiante no existe."
            ]);

            exit;
        }


        echo json_encode([
            "success" => true,
            "message" =>
                "Estudiante eliminado correctamente."
        ]);

        exit;
    }


    // ==========================================
    // MÉTODO NO PERMITIDO
    // ==========================================

    http_response_code(405);

    echo json_encode([
        "success" => false,
        "message" => "Método no permitido."
    ]);

} catch (PDOException $e) {

    http_response_code(500);

    echo json_encode([
        "success" => false,
        "message" => "Error en la base de datos.",
        "error" => $e->getMessage()
    ]);
}