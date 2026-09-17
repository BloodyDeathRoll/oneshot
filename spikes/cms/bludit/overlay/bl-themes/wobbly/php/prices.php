<?php defined('BLUDIT') or die('Bludit CMS.');
$h = function ($s) { return htmlspecialchars((string) $s, ENT_QUOTES, 'UTF-8'); };
?>
  <section class="page-head">
    <p class="kicker"><?php echo $page->custom('kicker') ?></p>
    <h1 class="page-title"><?php echo $page->title() ?></h1>
    <div class="prose"><?php echo $page->content() ?></div>
  </section>
  <ul class="prices">
    <?php foreach ($themePlugin->prices() as $item): ?>
    <li class="price"><span class="price-name"><?php echo $h($item['name']) ?></span><span class="price-duration"><?php echo $h($item['duration']) ?></span><span class="price-amount"><?php echo $h($item['price']) ?></span><?php if ($item['note'] !== ''): ?><p class="price-note"><?php echo $h($item['note']) ?></p><?php endif ?></li>
    <?php endforeach ?>
  </ul>
  <p class="footnote"><?php echo $themePlugin->getValue('footnote') ?></p>
  <p><a class="btn btn-wa" href="<?php echo $waUrl ?>">Book on WhatsApp</a></p>
