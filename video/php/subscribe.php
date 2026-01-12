<?php
if($_POST)
{
    $to_Email       = "myemail@gmail.com"; //Replace with recipient email address
    $subject        = 'New subscription'; //Subject line for emails
	
	
	$from           = "no-reply@site.com";
    
    //check if its an ajax request, exit if not
    if(!isset($_SERVER['HTTP_X_REQUESTED_WITH']) AND strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) != 'xmlhttprequest') {
    
        //exit script outputting json data
        $output = json_encode(
        array(
            'type'=>'error', 
            'text' => 'Request must come from Ajax'
        ));
        
        die($output);
    } 
    
    //check $_POST vars are set, exit if any missing
    if(!isset($_POST["userEmail"]))
    {
        $output = json_encode(array('type'=>'error', 'text' => 'Email field is empty!'));
        die($output);
    }

    //Sanitize input data using PHP filter_var().
    $user_Email       = filter_var($_POST["userEmail"], FILTER_SANITIZE_EMAIL);
    
	
    //additional php validation
    if(!filter_var($user_Email, FILTER_VALIDATE_EMAIL)) //email validation
    {
        $output = json_encode(array('type'=>'error', 'text' => 'Please enter a valid email!'));
        die($output);
    }
    
    //proceed with PHP email.

    /*
    Incase your host only allows emails from local domain, 
    you should un-comment the first line below, and remove the second header line. 
    Of-course you need to enter your own email address here, which exists in your cp.
    */
    //$headers = 'From: your-name@YOUR-DOMAIN.COM' . "\r\n" .
    $headers = 'From: '.$from.'' . "\r\n" . //remove this line if line above this is un-commented
    'Reply-To: '.$from.'' . "\r\n" .
    'X-Mailer: PHP/' . phpversion();
    
        // send mail
    $sentMail = @mail($to_Email, $subject, "New user subscription: " . $user_Email, $headers);
    
    if(!$sentMail)
    {
        $output = json_encode(array('type'=>'error', 'text' => 'There was a problem with your e-mail.'));
        die($output);
    }else{
        $output = json_encode(array('type'=>'message', 'text' => 'Your e-mail has been added to our mailing list!'));
        die($output);
    }
}
?>
