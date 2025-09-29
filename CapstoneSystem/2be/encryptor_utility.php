<?php

function customEncrypt($value, $keys) {
    $shiftKeys = [];
    for ($i = 0; $i < count($keys); $i++) {
        if (($i + 1) % 2 !== 0) {
            $shiftKeys[] = $keys[$i];
        }
    }

    // Divide value into 3 sections
    $sectionLength = ceil(strlen($value) / 3);
    $sections = [
        substr($value, 0, $sectionLength),
        substr($value, $sectionLength, $sectionLength),
        substr($value, 2 * $sectionLength)
    ];

    $encryptedValue = "";

    foreach ($sections as $index => $section) {
        $shift = $shiftKeys[$index];
        for ($i = 0; $i < strlen($section); $i++) {
            $charCode = ord($section[$i]);
            $encryptedValue .= chr($charCode + $shift);
        }
    }

    return $encryptedValue;
}

?>
