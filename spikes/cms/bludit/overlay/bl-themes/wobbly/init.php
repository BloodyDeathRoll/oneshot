<?php defined('BLUDIT') or die('Bludit CMS.');

if ($themePlugin == false) {
	exit('The Wobbly theme needs the "Wobbly: prices and contact" plugin. Activate it in the admin panel under Plugins.');
}

// Small helpers used by the templates.
function wobblyDigits($value) {
	return preg_replace('/\D+/', '', (string) $value);
}
// Returns the page object for a slug, or false.
function wobblyPage($key) {
	try {
		return new Page($key);
	} catch (Exception $e) {
		return false;
	}
}
