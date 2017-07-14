<?php

@$name = $_POST['name'];
@$email = $_POST['email'];
@$address = $_POST['message'];


echo $name AND $email AND $phone AND $address AND $city AND $cuntery AND $code;

$to = 'name@domin.com';
$subject = 'the subject';
$message = "name = : $name email is : $email messige:  $address ";
$headers = 'From: webmaster@example.com' . "\r\n" .
        'Reply-To: webmaster@example.com' . "\r\n" .
        'X-Mailer: PHP/' . phpversion();

mail($to, $subject, $message, $headers);
if ( mail($to,$subject,$message,$headers) ) {
   echo "Your Message has been send";
   } else {
   echo "The email has failed!";
   }
?>