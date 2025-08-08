<?php
    //INDEXED ARRAY---------------------------------------------
    $arr1 = array("text1","text2","text3"); //original syntax
    $arr2 = ["text1","text2","text3"];      //since php 5.4


    displayElements($arr1);
    $arr2[]="text4"; //ADD AT THE END
    $arr2[0]="text100"; //REPLACE
    displayElements($arr2);


    //ASSOCIATIVE ARRAY-----------------------------------------
    $arr3 = array("key1"=>"value1", "key2"=>"value2", "key3"=>"value3"); //original syntax
    $arr4 = ["key1"=>"value1", "key2"=>"value2", "key3"=>"value3"];      //since php 5.4


    echo "\n\n".$arr3["key1"]; //accessing value
    $arr3["key2"]="qwertty"; //modifying
    displayElements($arr3);



    //ARRAY BUILT-IN FUNCTIONS-------------------------------------
    echo "\nsize of arr1: ".count($arr1);
    echo "\nsize of arr2: ".count($arr2);
    echo "\nsize of arr3: ".count($arr3);
    echo "\nsize of arr4: ".count($arr4);

    //MERGE ARRAY
    $newArr=array_merge($arr1, $arr2);
    displayElements($newArr);

    //REMOVE THE ELEMENT
    array_pop($newArr);
    displayElements($newArr);

    //ADD TO THE LAST
    array_push($newArr, "hakdogggg");
    displayElements($newArr);

    //SEARCH ELEMENT
    echo "<br>value = 1, then exist. The value: ".in_array("hakdogggg", $newArr);



    
    function displayElements($theArray){
        echo "<br>";
        foreach($theArray as $element){
            echo $element." ";
        }
    }



    
    session_start();
    $_SESSION['arraySample']=$arr1;
    displayElements($_SESSION['arraySample']);

?>