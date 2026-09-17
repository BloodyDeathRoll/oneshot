<?php defined('BLUDIT') or die('Bludit CMS.'); ?>
  <section class="page-head">
    <?php if ($is404 || !isset($page) || !is_object($page)): ?>
    <h1 class="page-title">Page not found</h1>
    <div class="prose"><p><a href="<?php echo Theme::siteUrl() ?>">Back to the home page</a></p></div>
    <?php else: ?>
    <h1 class="page-title"><?php echo $page->title() ?></h1>
    <div class="prose"><?php echo $page->content() ?></div>
    <?php endif ?>
  </section>
