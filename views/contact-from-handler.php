<?php
$name=$_POST['name'];
$visitor_name=$_['email'];
$message=$_POST['message'];

$email_form='Crypofolio@crpto.com';

$email_subject="New From Submission";

$email_body="User Name:$name.\n".
            "User Email:$visitor_email.\n".
            "User Message:$message.\n";

$to="moran.esh@gmail.com";
$headers="Form:$email_from\r\n";
$headers="Ready-To:$visitor_email\r\n";
mail($to,$email_subject,$email_body,$headers);

header("Location: contact.html");
?>