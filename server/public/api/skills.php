<?php

    require_once('functions.php');
    set_exception_handler('error_handler');
    require_once('db_connection.php');

    set_headers();

    switch($_SERVER['REQUEST_METHOD']){
        case 'GET':
            require_once('./skills/agents_get_skills.php');
            break;
    }

?>
