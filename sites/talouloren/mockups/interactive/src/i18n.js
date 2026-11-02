// Shared by build.mjs (renders the Hebrew into the HTML) and the page (the English toggle).
// A key is a dotted path into copy/<locale>.json ("x." = "extras."), with two suffixes:
//   "#i" = paragraph i of a blank-line separated body; "@i" = word i of the list after the last ":".
function tr(dict, key) {
  var m = key.match(/^(.*?)(?:([#@])(\d+))?$/), path = m[1].replace(/^x\./, 'extras.');
  var v = path.split('.').reduce(function (a, p) { return a == null ? a : a[p]; }, dict);
  if (v == null) return '';
  v = String(v);
  if (m[2] === '#') v = v.split(/\n\s*\n/)[+m[3]] || '';
  if (m[2] === '@') v = (v.split(':').pop().split(/,\s*/)[+m[3]] || '').replace(/\.\s*$/, '').trim();
  return v;
}
function trHtml(s) {
  // placeholders ({price_session}) are shown, marked, never filled with invented values
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/\{([a-z_0-9]+)\}/g, '<mark class="ph">{$1}</mark>');
}
