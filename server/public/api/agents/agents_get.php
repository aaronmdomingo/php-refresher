<?php

$has_id = isset($_GET['id']);

if ($has_id) {
  $id = $_GET['id'];
  $get_query = "SELECT * FROM `agents` WHERE `id` = ?";
  $prepared_query = mysqli_prepare($conn, $get_query);
  mysqli_stmt_bind_param($prepared_query, 's', $id);
  mysqli_stmt_execute($prepared_query);
  $get_result = mysqli_stmt_get_result($prepared_query);
} else {
  $get_query = "SELECT * FROM `agents`";
  $get_result = mysqli_query($conn, $get_query);
}
$get_output = [];

if ($get_result) {
  if (mysqli_num_rows($get_result) > 0) {
    while ($row = mysqli_fetch_assoc($get_result)) {
      $get_output[] = $row;
    };
    $res_payload = [
      "success" => true,
      "data" => $get_output
    ];
    $json_res = json_encode($res_payload);
    http_response_code(200);
    print($json_res);
  } else {
    http_response_code(404);
    throw new Exception("No agents found");
  }
} else {
  http_response_code(500);
  throw new Exception("Query was not successful");
}

?>
