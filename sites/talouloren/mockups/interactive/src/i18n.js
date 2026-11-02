// Shared by build.mjs (renders the Hebrew into the HTML) and the page (the English toggle).
// A key is a dotted path into copy/<locale>.json ("x." = "extras."), with suffixes:
//   "#i" = paragraph i of a blank-line separated body; "@i" = word i of the list after the last ":";
//   "~"  = in English only, keep the Latin words of a mixed Hebrew/Latin film title ("מיתוג מעסיק TABOOLA" -> "TABOOLA").
function tr(dict, key) {
  var m = key.match(/^(.*?)(?:([#@])(\d+))?(~)?$/), path = m[1].replace(/^x\./, 'extras.');
  var v = path.split('.').reduce(function (a, p) { return a == null ? a : a[p]; }, dict);
  if (v == null) return '';
  v = String(v);
  if (m[2] === '#') v = v.split(/\n\s*\n/)[+m[3]] || '';
  if (m[2] === '@') v = (v.split(':').pop().split(/,\s*/)[+m[3]] || '').replace(/\.\s*$/, '').trim();
  if (m[4] && dict.locale === 'en') v = v.replace(/[֐-׿][֐-׿"'\-]*/g, '').replace(/\s+/g, ' ').trim();
  return v;
}
// Undecided values stay visible (brief A26), set as a designed "to come" mark, never as a code token.
// The owner sees the field name in the tooltip; the visitor reads what will go there.
var PH = {
  he: { price: 'המחיר יפורסם בקרוב', session_length: 'משך הפגישה יפורסם', check_minutes: 'כמה', turnaround: 'זמן קצר שנפרסם',
    partnership_capacity: 'מספר מוגבל של', budget_ranges: 'טווחי התקציב יפורסמו', consent_text: 'נוסח ההסכמה יפורסם בקרוב',
    privacy_policy: 'מדיניות הפרטיות תפורסם בקרוב', accessibility: 'יפורסם בקרוב', case_story: 'הסיפור המלא בקרוב',
    business_name: 'שם העסק שלכם', first_name: '', partner_name: 'טל או שחר', service_name: 'שירות לפי הצורך',
    observation: 'תובנה מתוך הבדיקה', first_move: 'הצעד הראשון שלכם, מתוך הבדיקה', date: 'מועד שבחרתם', time: 'שבחרתם', other: 'בקרוב' },
  en: { price: 'Price to be announced', session_length: 'Length to be announced', check_minutes: 'A few', turnaround: 'a short time we will publish',
    partnership_capacity: 'A limited number of', budget_ranges: 'Budget ranges to be announced', consent_text: 'Consent wording coming soon',
    privacy_policy: 'Privacy policy coming soon', accessibility: 'Coming soon', case_story: 'Full story coming soon',
    business_name: 'Your business', first_name: '', partner_name: 'Tal or Shahar', service_name: 'a service as needed',
    observation: 'An observation from your Check', first_move: 'Your first move, from the Check', date: 'the day you chose', time: 'the time you chose', other: 'Coming soon' }
};
function phLabel(name, lang) {
  var L = PH[lang] || PH.he;
  var k = /price/.test(name) ? 'price' : /^case_story/.test(name) ? 'case_story' : /^accessibility/.test(name) ? 'accessibility'
    : /^observation/.test(name) ? 'observation' : (name in L ? name : 'other');
  return L[k];
}
function trHtml(s, lang) {
  return String(s).replace(/,\s*\{first_name\}/g, '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/\{([a-z_0-9]+)\}/g, function (_, n) {
      var t = phLabel(n, lang);
      return t ? '<mark class="ph" title="{' + n + '}">' + t + '</mark>' : '';
    });
}
