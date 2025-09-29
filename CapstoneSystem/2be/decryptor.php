<?php

function customDecrypt($encryptedValue, $fullKeys) {
    $shiftKeys = [];
    for ($i = 0; $i < count($fullKeys); $i++) {
        if (($i + 1) % 2 !== 0) { 
            $shiftKeys[] = $fullKeys[$i];
        }
    }

    $sectionLength = (int)ceil(strlen($encryptedValue) / 3);
    $sections = [
        substr($encryptedValue, 0, $sectionLength),
        substr($encryptedValue, $sectionLength, $sectionLength),
        substr($encryptedValue, 2 * $sectionLength)
    ];

    $decryptedValue = "";

    foreach ($sections as $index => $section) {
        $shift = $shiftKeys[$index];
        for ($i = 0; $i < strlen($section); $i++) {
            $charCode = ord($section[$i]);
            $decryptedValue .= chr($charCode - $shift);
        }
    }

    return $decryptedValue;
}

?>
