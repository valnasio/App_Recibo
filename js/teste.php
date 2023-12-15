<?php
$server = "192.168.10.244";
$share = "/arquivos/recibos/";
$domain = "unef.corp";
$username = "administrador";
$password = "@296BE79A3B";

$targetPath = "smb://$username:$password@$domain/$server$share";

echo "Teste de conexão com o servidor: $targetPath";
?>
