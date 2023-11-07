<?php
if (!function_exists('saveImageAndGetPath')) {
    function saveImageAndGetPath($image)
    {
        // Get filename with the extension
        $filenameWithExt = $image->getClientOriginalName();
        //Get just filename
        $filename = pathinfo($filenameWithExt, PATHINFO_FILENAME);
        // Get just ext
        $extension = $image->getClientOriginalExtension();
        // Filename to store
        $fileNameToStore = $filename . '_' . time() . '.' . $extension;

        $image->storeAs('public/images', $fileNameToStore);

        return $fileNameToStore;
    }
}
