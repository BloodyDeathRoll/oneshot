<?php
/*
 * First-run admin setup for the packaged Bludit site (oneshot CMS spike).
 *
 * The zip ships with content but WITHOUT bl-content/databases/users.php, so it holds no
 * credentials. This script creates the single admin user with a password the owner chooses,
 * in the same format Bludit's own install.php writes, then deletes itself.
 * It refuses to run once users.php exists.
 *
 * Not part of Bludit. Bludit's stock install.php is removed from the package because it
 * would refuse to run anyway (site.php already exists).
 */
$usersFile = __DIR__ . '/bl-content/databases/users.php';
$minLength = 12;
$error = '';

if (file_exists($usersFile)) {
	@unlink(__FILE__);
	http_response_code(403);
	exit('Already set up. This file should be deleted.');
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
	$password = isset($_POST['password']) && is_string($_POST['password']) ? $_POST['password'] : '';
	$confirm = isset($_POST['confirm']) && is_string($_POST['confirm']) ? $_POST['confirm'] : '';
	if (strlen($password) < $minLength) {
		$error = 'Use at least ' . $minLength . ' characters.';
	} elseif ($password !== $confirm) {
		$error = 'The two passwords are not the same.';
	} else {
		$salt = bin2hex(random_bytes(8));
		$now = gmdate('Y-m-d H:i:s');
		$data = array('admin' => array(
			'nickname' => 'Admin', 'firstName' => '', 'lastName' => '', 'description' => '',
			'role' => 'admin',
			'password' => sha1($password . $salt), // Bludit 3.22's own scheme (users.class.php generatePasswordHash)
			'salt' => $salt,
			'email' => '', 'registered' => $now,
			'tokenRemember' => '', 'tokenAuth' => bin2hex(random_bytes(16)), 'tokenAuthTTL' => '2009-03-15 14:00',
			'twitter' => '', 'facebook' => '', 'codepen' => '', 'instagram' => '', 'github' => '', 'gitlab' => '',
			'linkedin' => '', 'mastodon' => '', 'vk' => '', 'youtube' => '', 'bluesky' => ''
		));
		// 'x' fails if the file already exists, so two people racing cannot both win.
		$fh = @fopen($usersFile, 'x');
		if ($fh === false) {
			$error = 'Could not create the user file. Check that bl-content/databases is writable.';
		} else {
			fwrite($fh, "<?php defined('BLUDIT') or die('Bludit CMS.'); ?>" . PHP_EOL . json_encode($data, JSON_PRETTY_PRINT));
			fclose($fh);
			$deleted = @unlink(__FILE__);
			$base = rtrim(str_replace('\\', '/', dirname($_SERVER['SCRIPT_NAME'])), '/');
			header('Content-Type: text/html; charset=utf-8');
			echo '<p>Admin user <strong>admin</strong> created. <a href="' . htmlspecialchars($base, ENT_QUOTES) . '/admin/">Log in</a>.</p>';
			if (!$deleted) {
				echo '<p><strong>Delete first-run.php from the server now.</strong></p>';
			}
			exit;
		}
	}
}
?>
<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex"><title>First-run setup</title>
<style>body{font:16px/1.5 system-ui,sans-serif;max-width:26em;margin:12vh auto;padding:0 20px}input{width:100%;padding:10px;margin:4px 0 14px;font:inherit}button{padding:10px 18px;font:inherit}.err{color:#b00020}</style>
</head><body>
<h1>Set the admin password</h1>
<p>User name: <strong>admin</strong>. Choose a long password (<?php echo $minLength ?>+ characters) and keep it in a password manager.</p>
<?php if ($error) { echo '<p class="err">' . htmlspecialchars($error, ENT_QUOTES) . '</p>'; } ?>
<form method="post" autocomplete="off">
<label>Password<input type="password" name="password" minlength="<?php echo $minLength ?>" required></label>
<label>Repeat password<input type="password" name="confirm" minlength="<?php echo $minLength ?>" required></label>
<button type="submit">Create admin user</button>
</form>
</body></html>
