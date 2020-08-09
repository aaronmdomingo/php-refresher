<?php

    $has_id = isset($_GET["id"]);

    if ($has_id) {
      $id = $_GET["id"];
      $delete_query = "DELETE FROM `agents` WHERE `id` = ?";
      $prepared_query = mysqli_prepare($conn, $delete_query);
      mysqli_stmt_bind_param($prepared_query, 's', $id);
      $delete_result = mysqli_stmt_execute($prepared_query);
      $delete_skills_query = "DELETE FROM `agent_skills` WHERE `agent_id` = ?";
      $prepared_skills_query = mysqli_prepare($conn, $delete_skills_query);
      $delete_skills_result = mysqli_stmt_execute($prepared_skills_query);

      if (!$delete_result) {
        throw new Exception('Deleting agent failed');
      } else {
        http_response_code(200);
        $output = [
            "success" => true,
            "message" => "Successfully deleted agent"
        ];
        $json_output = json_encode($output);
        print($json_output);
      }
    } else {
      http_response_code(404);
      throw new Exception('Deleting agent failed, please provide a valid id');
    }

?>
