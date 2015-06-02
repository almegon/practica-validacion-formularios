<?php
/* Descomentaríamos la siguiente línea para mostrar errores de php en el fichero: */
// ini_set('display_errors', '1');
/* Definimos los parámetros de conexión con la bbdd: */
/*
$dbinfo = "mysql:dbname=validacion;host=localhost";
$user = "root";
$pass = "root";
*/
$dbinfo = "mysql:dbname=validacion;host=localhost";
$user = "root";
$pass = "root";
//Nos intentamos conectar:
try {
    /* conectamos con bbdd e inicializamos conexión como UTF8 */
    $db = new PDO($dbinfo, $user, $pass);
    $db->exec('SET CHARACTER SET utf8');
} catch (Exception $e) {
    echo "La conexi&oacute;n ha fallado: " . $e->getMessage();
}
/* Para hacer debug cargaríamos a mano el parámetro, descomentaríamos la siguiente línea: */
//$_REQUEST['zip'] = "12";
$prueba=$_POST['zip'];
echo"$prueba";
if (isset($_POST['zip'])) {
    /* La línea siguiente la podemos descomentar para ver desde firebug-xhr si se pasa bien el parámetro desde el formulario */
    //echo $_REQUEST['email'];
    ?>

    <?php
   
    $sql = $db->prepare("SELECT Municipio,CodPostal FROM t_municipios WHERE CodPostal=?");
    $sql->bindParam(1,$prueba);
    $sql->execute();
    /* Ojo... PDOStatement::rowCount() devuelve el número de filas afectadas por la última sentencia DELETE, INSERT, o UPDATE 
     * ejecutada por el correspondiente objeto PDOStatement.Si la última sentencia SQL ejecutada por el objeto PDOStatement 
     * asociado fue una sentencia SELECT, algunas bases de datos podrían devolver el número de filas devuelto por dicha sentencia. 
     * Sin embargo, este comportamiento no está garantizado para todas las bases de datos y no debería confiarse en él para 
     * aplicaciones portables.
     */
    /*
    $valid = 'true'; 
    if ($sql->rowCount() > 0) {
        $valid= 'false';
    } else {
       $valid='true';
    }
    
    */
   // $okey = $sql->fetch(); 
       ?>
 
    <?php  
    while ($row=$sql->fetch()) {   
           ?>

    <?php
    $opciones.= "<option ='{$row['CodPostal']}'>{$row['Municipio']}</option>";
  
    
      }
     
    echo $opciones;
   
    
}
$sql=null;
$db = null;
echo $okey[0];
?>
