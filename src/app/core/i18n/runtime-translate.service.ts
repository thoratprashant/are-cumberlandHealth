import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class RuntimeTranslateService {
  private cache = new Map<string, string>();

  async translateAll(texts: string[], lang: string) {
    const missing = texts.filter(t => !this.cache.has(lang + t));

    if (!missing.length) return;

    const res = await fetch('http://localhost:3000/api/v1/translate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ texts: missing, lang })
    });

    const data = await res.json();

    Object.keys(data).forEach(key => {
      this.cache.set(lang + key, data[key]);
    });
  }

  get(text: string, lang: string) {
    return this.cache.get(lang + text) || text;
  }

  clear() {
    this.cache.clear();
  }
}
