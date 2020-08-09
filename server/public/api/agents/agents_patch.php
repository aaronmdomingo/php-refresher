<?php

    $body_data = get_body_data();
    $name = $body_data["name"];
    $class = $body_data["class"];
    $img = $body_data["img"];
    $id = $body_data['id'];

    $patch_query = "UPDATE `agents` SET `name` = ?, `class` = ?, `img` = ? WHERE `id` = ?";
    $prepared_query = mysqli_prepare($conn, $patch_query);
    mysqli_stmt_bind_param($prepared_query, 'ssss', $name, $class, $img, $id);
    $patch_result = mysqli_stmt_execute($prepared_query);

    if (!$patch_result) {
      throw new Exception('Editing entry failed');
    } else {
        http_response_code(200);
        $output = [
            "success" => true,
            "message" => "Successfully updated agent entry"
        ];
        $json_output = json_encode($output);
        print($json_output);
    }

?>
