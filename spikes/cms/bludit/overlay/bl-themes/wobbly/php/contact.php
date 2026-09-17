<?php defined('BLUDIT') or die('Bludit CMS.'); ?>
  <section class="page-head">
    <p class="kicker"><?php echo $page->custom('kicker') ?></p>
    <h1 class="page-title"><?php echo $page->title() ?></h1>
    <div class="prose"><?php echo $page->content() ?></div>
  </section>
  <ul class="cards">
    <li class="card"><h2>WhatsApp</h2><p><?php echo $themePlugin->getValue('whatsapp') ?></p><a class="btn btn-wa" href="<?php echo $waUrl ?>">Message us</a></li>
    <li class="card"><h2>Phone</h2><p><?php echo $themePlugin->getValue('phone') ?></p><a class="btn" href="<?php echo $telUrl ?>">Call</a></li>
    <li class="card"><h2>Find us</h2><p><?php echo $themePlugin->getValue('address') ?><br><?php echo $themePlugin->getValue('hours') ?></p><a class="btn" href="<?php echo $themePlugin->getValue('mapUrl') ?>">Open map</a></li>
  </ul>
