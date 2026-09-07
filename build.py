#!/usr/bin/env python3
"""Bundle the reviewer into ONE self-contained HTML file (dist/reviewer.html).
Useful for sharing by AirDrop/Messages, or publishing anywhere that wants a single file.
The normal Vercel deploy does NOT need this — it serves the folder as-is.

    python3 build.py
"""
import os, re, json
ROOT = os.path.dirname(os.path.abspath(__file__))
def read(p):
    with open(os.path.join(ROOT, p), encoding='utf-8') as f: return f.read()

html = read('index.html')
css = read('styles.css')
manifest = read('data/manifest.js')
paths = re.findall(r"'([^']+\.js)'", manifest)
scripts = [read('data/illustrations.js'), read('data/activities.js'), read('app.js')] + [read(p) for p in paths]
bundle = "<script>window.REVIEWER_BUNDLED=true;</script>\n" + "\n".join(f"<script>\n{s}\n</script>" for s in scripts)

html = html.replace('<link rel="stylesheet" href="styles.css">', f"<style>\n{css}\n</style>")
html = html.replace('<script src="app.js"></script>', bundle)
html = html.replace('<link rel="apple-touch-icon" href="icon.png">', '')

os.makedirs(os.path.join(ROOT, 'dist'), exist_ok=True)
out = os.path.join(ROOT, 'dist', 'reviewer.html')
with open(out, 'w', encoding='utf-8') as f: f.write(html)
print('wrote', out, len(html)//1024, 'KB')
