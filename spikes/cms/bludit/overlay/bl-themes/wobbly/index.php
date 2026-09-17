<?php defined('BLUDIT') or die('Bludit CMS.');
// Values coming from Bludit (page fields, plugin settings) are stored HTML-escaped, so they are echoed as they are.
$waUrl  = 'https://wa.me/' . wobblyDigits($themePlugin->getValue('whatsapp'));
$telUrl = 'tel:+' . wobblyDigits($themePlugin->getValue('phone'));
$is404  = $url->notFound();
$template = (!$is404 && isset($page) && is_object($page)) ? $page->template() : '';
$currentKey = (isset($page) && is_object($page)) ? $page->key() : '';
?>
<!doctype html>
<html lang="<?php echo Theme::lang() ?>">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<?php echo Theme::metaTagTitle(); ?>
<?php echo Theme::metaTagDescription(); ?>
<?php echo Theme::css('css/site.css'); ?>
<?php Theme::plugins('siteHead'); ?>
</head>
<body>
<?php Theme::plugins('siteBodyBegin'); ?>
<header class="site-head wrap">
  <a class="brand" href="<?php echo Theme::siteUrl() ?>">Wobbly <span>Pelican</span></a>
  <nav aria-label="Main"><ul class="nav">
    <?php foreach ($staticContent as $item): if ($item->isChild()) { continue; } ?>
    <li><a href="<?php echo ($item->key() == $site->homepage()) ? Theme::siteUrl() : $item->permalink(); ?>"<?php if ($item->key() == $currentKey) echo ' aria-current="page"'; ?>><?php echo $item->title(); ?></a></li>
    <?php endforeach ?>
  </ul></nav>
</header>
<main class="wrap">
<?php
if ($template == 'home') {
	include(THEME_DIR_PHP . 'home.php');
} elseif ($template == 'prices') {
	include(THEME_DIR_PHP . 'prices.php');
} elseif ($template == 'contact') {
	include(THEME_DIR_PHP . 'contact.php');
} else {
	include(THEME_DIR_PHP . 'default.php');
}
?>
</main>
<footer class="site-foot">
  <div class="wrap">
    <div class="cols">
      <div><strong><?php echo $site->title() ?></strong><br><?php echo $themePlugin->getValue('address') ?></div>
      <div>WhatsApp <a href="<?php echo $waUrl ?>"><?php echo $themePlugin->getValue('whatsapp') ?></a><br>Phone <a href="<?php echo $telUrl ?>"><?php echo $themePlugin->getValue('phone') ?></a></div>
      <div><?php echo $themePlugin->getValue('hours') ?><br><a href="<?php echo $themePlugin->getValue('mapUrl') ?>">Find us on the map</a></div>
    </div>
    <p class="fiction">Fictional placeholder site built for a CMS test. Wobbly Pelican Surf School is not a real business.</p>
  </div>
</footer>
<a class="btn btn-wa wa-float" href="<?php echo $waUrl ?>">WhatsApp us</a>
<?php if ($template == 'home') { echo Theme::js('js/waves.js', DOMAIN_THEME, 'defer'); } ?>
<?php Theme::plugins('siteBodyEnd'); ?>
</body>
</html>
