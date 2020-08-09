<?php

    $body_data = get_body_data();
    $name = $body_data["name"];
    $class = $body_data["class"];
    $img = $body_data["img"];

    $post_query = "INSERT INTO `agents` (`id`, `name`, `class`, `img`) VALUES (NULL, ?, ?, ?)";
    $prepared_query = mysqli_prepare($conn, $post_query);
    mysqli_stmt_bind_param($prepared_query, 'sss', $name, $class, $img);
    $post_result = mysqli_stmt_execute($prepared_query);

    if (!$post_result) {
      throw new Exception('Adding entry failed');
    } else {
        http_response_code(200);
        $output = [
            "success" => true,
            "message" => "Successfully added new entry"
        ];
        $json_output = json_encode($output);
        print($json_output);
    }

?>
