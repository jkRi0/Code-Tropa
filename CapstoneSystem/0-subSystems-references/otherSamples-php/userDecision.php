<?php
    $count=0;
    mainMethod($count);

    function mainMethod($count){
        
        while(true){
            
            if(ask($count)){
                $count++;
                echo "\n*****************************".$count."********************************\n";
            }else{
                exit("\nProgram Ended..."); //force exit
            }
        }
    }
    
    function ask($count){
        //using [echo "\e[H\e[J";] to clear the terminal
        echo "[0] to exit\n[1] to continue\nselect: ";
        $userInput=fgets(STDIN);

        switch($userInput){
            case '0': echo "zero"; echo "\e[H\e[J"; return false; break;
            case '1': echo "one"; echo "\e[H\e[J"; return true; break;
            default: echo "\ninvalid input, please try again.\n"; mainMethod($count);
        }
    }
    
    //REMOVE THE COUNT IN THE PARAMETER OF MAIN METHOD TO RESET THE COUNT WHEN INVALID INPUT
?>