<?php defined('BLUDIT') or die('Bludit CMS.');
// Companion plugin for the Wobbly theme.
// Bludit 3.22 has no repeating/list custom field, so the price list and the site-wide
// contact details are stored here and edited on this plugin's settings screen.

class wobbly extends Plugin
{
	const MAX_ROWS = 30;

	public function init()
	{
		$this->dbFields = array(
			'whatsapp' => '',
			'phone' => '',
			'address' => '',
			'hours' => '',
			'mapUrl' => '',
			'footnote' => '',
			'prices' => '[]' // JSON array of {name,duration,price,note}
		);
	}

	// Decoded price list, raw (unescaped) strings. Templates must escape on output.
	public function prices()
	{
		$rows = json_decode($this->getValue('prices', false), true);
		return is_array($rows) ? $rows : array();
	}

	// Link in the admin sidebar so the owner does not have to find Plugins > Settings.
	public function adminSidebar()
	{
		return '<a class="nav-link" href="' . HTML_PATH_ADMIN_ROOT . 'configure-plugin/' . $this->className() . '"><span class="fa fa-tag"></span>Prices &amp; contact</a>';
	}

	public function post()
	{
		$rows = array();
		$names = isset($_POST['priceName']) && is_array($_POST['priceName']) ? $_POST['priceName'] : array();
		foreach ($names as $i => $name) {
			if (count($rows) >= self::MAX_ROWS) {
				break;
			}
			$row = array(
				'name' => $this->clean($name),
				'duration' => $this->clean(isset($_POST['priceDuration'][$i]) ? $_POST['priceDuration'][$i] : ''),
				'price' => $this->clean(isset($_POST['priceAmount'][$i]) ? $_POST['priceAmount'][$i] : ''),
				'note' => $this->clean(isset($_POST['priceNote'][$i]) ? $_POST['priceNote'][$i] : '')
			);
			if ($row['name'] === '' && $row['price'] === '') {
				continue; // an emptied row means "delete this price"
			}
			$rows[] = $row;
		}
		$this->db['prices'] = Sanitize::html(json_encode($rows));

		foreach (array('whatsapp', 'phone', 'address', 'hours', 'footnote') as $field) {
			if (isset($_POST[$field]) && is_string($_POST[$field])) {
				$this->db[$field] = Sanitize::html($this->clean($_POST[$field]));
			}
		}
		if (isset($_POST['mapUrl']) && is_string($_POST['mapUrl'])) {
			$mapUrl = trim($_POST['mapUrl']);
			// Only http(s) links, so nobody can store a javascript: URL.
			if ($mapUrl === '' || preg_match('#^https?://#i', $mapUrl)) {
				$this->db['mapUrl'] = Sanitize::html($mapUrl);
			}
		}
		return $this->save();
	}

	private function clean($value)
	{
		return is_string($value) ? trim(mb_substr(strip_tags($value), 0, 200)) : '';
	}

	public function form()
	{
		$h = function ($s) { return htmlspecialchars((string) $s, ENT_QUOTES, 'UTF-8'); };

		$html  = '<h4 class="mt-4">Price list</h4>';
		$html .= '<p class="text-muted">Change a price and press Save. To remove a line, empty its name and price. Use the blank line at the bottom to add a new one.</p>';
		$rows = $this->prices();
		$rows[] = array('name' => '', 'duration' => '', 'price' => '', 'note' => '');
		foreach ($rows as $row) {
			$html .= '<div class="form-row mb-2 wobbly-price-row">';
			$html .= '<div class="col-4"><input class="form-control" type="text" name="priceName[]" placeholder="Lesson or rental" value="' . $h($row['name']) . '"></div>';
			$html .= '<div class="col-2"><input class="form-control" type="text" name="priceDuration[]" placeholder="Duration" value="' . $h($row['duration']) . '"></div>';
			$html .= '<div class="col-2"><input class="form-control" type="text" name="priceAmount[]" placeholder="Price" value="' . $h($row['price']) . '"></div>';
			$html .= '<div class="col-4"><input class="form-control" type="text" name="priceNote[]" placeholder="Small note (optional)" value="' . $h($row['note']) . '"></div>';
			$html .= '</div>';
		}
		$html .= '<div class="mb-3"><label for="footnote">Footnote under the price list</label>';
		$html .= '<input class="form-control" type="text" id="footnote" name="footnote" value="' . $this->getValue('footnote') . '"></div>';

		$html .= '<h4 class="mt-4">Contact details</h4>';
		$fields = array(
			'whatsapp' => 'WhatsApp number (with country code). Used for every WhatsApp button.',
			'phone' => 'Phone number (with country code)',
			'address' => 'Address line',
			'hours' => 'Opening hours',
			'mapUrl' => 'Map link (paste from Google Maps or OpenStreetMap)'
		);
		foreach ($fields as $name => $label) {
			$html .= '<div class="mb-3"><label for="' . $name . '">' . $label . '</label>';
			$html .= '<input class="form-control" type="' . ($name == 'mapUrl' ? 'url' : 'text') . '" id="' . $name . '" name="' . $name . '" value="' . $this->getValue($name) . '"></div>';
		}
		return $html;
	}
}
