export function buildSrcdoc(
  { html = '', css = '', js = '' }: { html?: string; css?: string; js?: string },
): string {
  return (
    '<!doctype html><html><head><meta charset="utf-8">' +
    '<style>*{box-sizing:border-box}body{font-family:system-ui,sans-serif;margin:1rem}</style>' +
    '<style>' + css + '</style>' +
    '</head><body>' + html +
    '<' + 'script>' + js + '<' + '/script>' +
    '</body></html>'
  );
}
