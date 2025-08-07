<?php
    //CONNECTION
    $db_server = "localhost";
    $db_user = "root";
    $db_pass = "";
    $db_name = "grocery_ecommerce";
    try{
        $conn = mysqli_connect($db_server, $db_user, $db_pass, $db_name);
        echo '<script>console.log("Connected")</script>';
    }
    catch(mysqli_sql_exception){
        echo '<script>console.log("Could not connect!")</script>';
    }

    function create($attributesArray, $valueArray){
        $stringAttributes="";
        $stringValues="";

        $sql = "INSERT into products(product_name, description,price,quantity,category,barcode) values ('$prodName','$desc','$price','$quantity','$category','$barcode')";
        $conn->query($sql);
        $conn->close();
    }

    function read($result){
        $table="";
        if(!empty($result)){
            while ($row = $result->fetch_assoc()) {
                $table.="<tr>";
                    $table.="<td>" . htmlspecialchars($row['product_id']) . "</td>";
                    $table.="<td>" . htmlspecialchars($row['product_name']) . "</td>";
                    $table.="<td>" . htmlspecialchars($row['description']) . "</td>";
                    $table.="<td>" . htmlspecialchars($row['price']) . "</td>";
                    $table.="<td>" . htmlspecialchars($row['quantity']) . "</td>";
                    $table.="<td>" . htmlspecialchars($row['category']) . "</td>";
                    $table.="<td style='background-color: white; border-color: black'>" . bar128(stripcslashes($row['barcode'])) . "</td>"; 
                    $table.="<td>
                        <a class='edit-btn text-decoration-none' href='editProduct.php?id=" . htmlspecialchars($row['product_id']) . "' >Edit</a>
                        <button type='button' class='delete-btn text-decoration-none' onclick='confirmDelete(" . htmlspecialchars($row['product_id']) . ")'>Delete</button>
                    </td>";
                $table.="</tr>";
            } 
        }
        
        return $table;
    }

    function update(){
        //Prepared Statement 
        $stmt = $conn->prepare("UPDATE products SET description = ?, price = ?, quantity = ? WHERE product_id = ?");
        $stmt->bind_param("sdii", $description, $price, $quantity, $product_id);
        
        if ($stmt->execute()) {
            echo "<script> alert('Updated Successfully.'); window.location.href = 'index.php';  </script>";
            exit();
        } else {
            echo "<script>alert('Error Updating Product: " . $conn->error . "');</script>";
        } 

        $stmt->close();
        $conn->close();
    }

    function delete(){
        //Prepared Statement 
        $stmt = $conn->prepare("DELETE from products WHERE product_id = ?");
        $stmt->bind_param("i", $product_id);
  
        if ($stmt->execute()) {
            echo "<script> alert('Deleted Successfully.'); window.location.href = 'index.php';  </script>";
            exit();
        } else {
            echo "<script>alert('Error Deleting Product: " . $conn->error . "');</script>";
        } 

        $stmt->close();
        $conn->close();
    }

    $arr=['asd','qwe','dfg'];
    
?>

<!doctype html>
<html>
    <body>
        <?php ?>
    </body>
</html>