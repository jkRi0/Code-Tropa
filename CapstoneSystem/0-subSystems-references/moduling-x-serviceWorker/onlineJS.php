<?php

header("Content-Type: application/javascript");

echo "
    export async function sayHelloOnline(message) {
        console.log('Hello from onlineJS (PHP module): ' + message);
        try {
            // Example: You can still fetch data from another PHP endpoint if needed
            // const response = await fetch('/some-php-data-endpoint.php?message=' + encodeURIComponent(message));
            // if (response.ok) {
            //     const data = await response.text();
            //     console.log('PHP data endpoint response:', data);
            // } else {
            //     console.error('PHP data endpoint error:', response.statusText);
            // }
        } catch (error) {
            console.error('Error in sayHelloOnline:', error);
        }
    }
";

?>
