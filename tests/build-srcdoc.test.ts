import { describe, it, expect } from 'vitest';
import { buildSrcdoc } from '../src/components/build-srcdoc';

describe('buildSrcdoc', () => {
  it('embeds css in a <style> tag', () => {
    expect(buildSrcdoc({ css: 'p{color:red}' })).toContain('<style>p{color:red}</style>');
  });
  it('embeds html in the body', () => {
    expect(buildSrcdoc({ html: '<h1>Hi</h1>' })).toContain('<h1>Hi</h1>');
  });
  it('embeds js in a <script> tag', () => {
    const out = buildSrcdoc({ js: 'console.log(1)' });
    expect(out).toContain('console.log(1)');
    expect(out.toLowerCase()).toContain('<script>');
  });
  it('produces a full html document', () => {
    expect(buildSrcdoc({}).toLowerCase()).toContain('<!doctype html>');
  });
});
