<?php
    $sampleVariable = "this is a set of string";
    $a = $sampleVariable[0];
    echo "\nindex 0 character is ".$a."\n";
    echo "the length is ".strlen($sampleVariable)."\n";
    echo "the character position is: ".findPosition($sampleVariable, "is", 3)."\n";
    echo usingForLoop($sampleVariable)."\n";
    echo usingForeach($sampleVariable)."\n";
    echo inputValidation(3);
    echo "\n".trim($sampleVariable, "ng");

    $b="yes";
    echo "\n".($b==="yes")."\n"; //output 1

    $b[1]="z";
    echo "\n".$b;
    
    //DISPLAY
    function usingForLoop($theString){
        $strLength=strlen($theString);
        for ($i = 0; $i < $strLength; $i++){
            echo ($theString[$i]." ");
        }
    }

    //DISPLAY
    function usingForeach($theString){
        //$chars = preg_split('//u', $theString, -1, PREG_SPLIT_NO_EMPTY);
        $chars = str_split($theString, 1); //string into array
        foreach ($chars as $char) {
            echo $char . " ";
        }
    }

    //RETURN POSITION
    function findPosition($theString, $theChar, $startPoint){
        $pos=strpos($theString, $theChar, $startPoint);
        return $pos;

        //strrpos() - Finds the position of the last occurrence
        //strripos() - Finds the position of the last occurrence
        //stripos() - Finds the position of the first occurrence

        /*
        if($pos !== true){
            
            echo "found";
        }else{
            echo "not existed";
        }*/
    }

    //VALIDATION
    function inputValidation($input){
        if(is_string($input)){
            echo $input." is a String";
        }else if(is_int($input)){
            echo $input." is an Integer";
        }
    }

    
?>