
<?php

    function error_handler($error)
    {
        $output = [
            "success" => false,
            "error" => $error->getMessage()
        ];
        $json_output = json_encode($output);
        print($json_output);
    }

    function set_headers(){
        header('Content-Type:application/json');
    }

    function get_body_data() {
        $postData = json_decode(file_get_contents('php://input'), true);
        return $postData;
      }

?>
