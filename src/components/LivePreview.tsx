import { useState, useEffect, useRef } from 'preact/hooks';
import { buildSrcdoc } from './build-srcdoc';

type Lang = 'html' | 'css' | 'js';

export default function LivePreview(
  { html, css, js, height = '220px' }: { html?: string; css?: string; js?: string; height?: string },
) {
  const provided: Lang[] = (['html', 'css', 'js'] as Lang[]).filter(
    (l) => ({ html, css, js }[l]) !== undefined,
  );
  const [code, setCode] = useState<Record<Lang, string>>({
    html: html ?? '', css: css ?? '', js: js ?? '',
  });
  const [tab, setTab] = useState<Lang>(provided[0] ?? 'html');
  const [doc, setDoc] = useState(() => buildSrcdoc(code));
  const timer = useRef<number | undefined>(undefined);

  useEffect(() => {
    clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setDoc(buildSrcdoc(code)), 300);
    return () => clearTimeout(timer.current);
  }, [code]);

  return (
    <div class="lp">
      <div class="lp__editor">
        {provided.length > 1 && (
          <div class="lp__tabs">
            {provided.map((l) => (
              <button class={`lp__tab ${tab === l ? 'lp__tab--active' : ''}`} onClick={() => setTab(l)}>
                {l.toUpperCase()}
              </button>
            ))}
          </div>
        )}
        <textarea
          class="lp__code"
          spellcheck={false}
          value={code[tab]}
          onInput={(e) => setCode({ ...code, [tab]: (e.target as HTMLTextAreaElement).value })}
        />
      </div>
      <iframe class="lp__preview" style={{ height }} sandbox="allow-scripts" srcdoc={doc} title="Live preview" />
    </div>
  );
}
