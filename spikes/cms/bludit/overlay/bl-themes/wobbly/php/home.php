<?php defined('BLUDIT') or die('Bludit CMS.');
$prices = $themePlugin->prices();
$lessons = wobblyPage('lessons');
?>
  <section class="hero">
    <div class="hero-media">
      <?php if ($page->coverImage()): ?><img src="<?php echo $page->coverImage() ?>" alt="<?php echo $page->custom('heroAlt') ?>" width="1600" height="1000"><?php endif ?>
      <canvas data-waves aria-hidden="true"></canvas>
    </div>
    <div class="hero-text">
      <p class="kicker"><?php echo $page->custom('kicker') ?></p>
      <h1><?php echo $page->custom('headline') ?> <em><?php echo $page->custom('headlineAccent') ?></em></h1>
      <p class="tagline"><?php echo $page->description() ?></p>
    </div>
  </section>
  <section class="split">
    <aside class="teaser">
      Lessons from
      <span class="from"><?php echo empty($prices) ? '' : htmlspecialchars($prices[0]['price'], ENT_QUOTES, 'UTF-8') ?></span>
      <a class="btn" href="<?php echo $lessons ? $lessons->permalink() : '#' ?>">See lessons &amp; prices</a>
    </aside>
    <div class="prose"><?php echo $page->content() ?></div>
  </section>
