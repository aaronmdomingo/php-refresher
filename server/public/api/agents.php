<?php

    require_once('functions.php');
    set_exception_handler('error_handler');
    require_once('db_connection.php');

    set_headers();

    switch($_SERVER['REQUEST_METHOD']){
        case 'GET':
            require_once('./agents/agents_get.php');
            break;
        case 'POST':
            require_once('./agents/agents_post.php');
            break;
        case 'DELETE':
            require_once('./agents/agents_delete.php');
            break;
        case 'PATCH':
            require_once('./agents/agents_patch.php');
            break;
    }

?>
