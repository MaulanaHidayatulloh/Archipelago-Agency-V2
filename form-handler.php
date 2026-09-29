<?php

header('Content-Type: application/json; charset=utf-8');

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

// Load Composer
require_once __DIR__ . '/vendor/autoload.php';

// Pastikan request POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode([
        'success' => false,
        'message' => 'Invalid Request!'
    ]);
    exit;
}

// Ambil data form
$name = trim($_POST['username'] ?? '');
$from_email = trim($_POST['email'] ?? '');
$message = trim($_POST['message'] ?? '');

// Validasi
if ($name === '' || $from_email === '' || $message === '') {
    echo json_encode([
        'success' => false,
        'message' => 'Please complete all fields.'
    ]);
    exit;
}

// Validasi email
if (!filter_var($from_email, FILTER_VALIDATE_EMAIL)) {
    echo json_encode([
        'success' => false,
        'message' => 'Invalid email address.'
    ]);
    exit;
}

// ===============================
// KONFIGURASI EMAIL
// ===============================
$smtp_username = 'example@gmail.com';
$smtp_password = 'password_GooogleAPP';

$to_email = 'example@gmail.com';
$to_name = 'Archipelago Agency';

// ===============================
// BUAT EMAIL
// ===============================
$mail = new PHPMailer(true);

try {

    // SMTP
    $mail->isSMTP();

    $mail->Host = 'smtp.gmail.com';
    $mail->SMTPAuth = true;

    $mail->Username = $smtp_username;
    $mail->Password = $smtp_password;

    // TLS
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
    $mail->Port = 587;

    // Pengirim
    $mail->setFrom(
        $smtp_username,
        'Archipelago Agency'
    );

    // Penerima
    $mail->addAddress(
        $to_email,
        $to_name
    );

    // Reply ke pengunjung
    $mail->addReplyTo(
        $from_email,
        $name
    );

    // Email HTML
    $mail->isHTML(true);

    $mail->Subject =
        'You Have Received a Message From ' . $name;

    $safe_name = htmlspecialchars(
        $name,
        ENT_QUOTES,
        'UTF-8'
    );

    $safe_email = htmlspecialchars(
        $from_email,
        ENT_QUOTES,
        'UTF-8'
    );

    $safe_message = nl2br(
        htmlspecialchars(
            $message,
            ENT_QUOTES,
            'UTF-8'
        )
    );

    $mail->Body = "
        <h3>Kontak Pesan Terbaru</h3>

        <p>
            <strong>Nama:</strong><br>
            {$safe_name}
        </p>

        <p>
            <strong>Email:</strong><br>
            {$safe_email}
        </p>

        <p>
            <strong>Pesan:</strong><br>
            {$safe_message}
        </p>
    ";

    // Versi text biasa
    $mail->AltBody =
        "Nama: {$name}\n" .
        "Email: {$from_email}\n\n" .
        "Pesan:\n{$message}";

    // Kirim
    $mail->send();

    echo json_encode([
        'success' => true,
        'message' => 'Message Sent Successfully'
    ]);

} catch (Exception $e) {

    echo json_encode([
        'success' => false,
        'message' => 'Message Failed to Send'
    ]);

}

exit;