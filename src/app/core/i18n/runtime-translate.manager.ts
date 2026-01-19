import { Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { RuntimeTranslateService } from './runtime-translate.service';

@Injectable({ providedIn: 'root' })
export class RuntimeTranslateManager {

  constructor(
    private router: Router,
    private translator: RuntimeTranslateService
  ) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        setTimeout(() => this.translatePage(), 0);
      }
    });
  }

  async translatePage() {
    const lang = localStorage.getItem('lang') || 'en';
    // English → just show original text
    if (lang === 'en') {
      this.restoreEnglish();
      this.restorePlaceholders();
      return;
    }

    // Hide content
    document.body.classList.add('lang-loading');

    const nodes = document.querySelectorAll('[runtimeTranslate]');
    const texts = Array.from(nodes)
      .map(el => el.getAttribute('data-original')!)
      .filter(Boolean);

    // PLACEHOLDERS
  const inputs = document.querySelectorAll('[runtimeTranslatePlaceholder]');
  const placeholders = Array.from(inputs)
    .map(el => el.getAttribute('data-original-placeholder')!)
    .filter(Boolean);  

    const uniqueTexts = Array.from(new Set([...texts, ...placeholders]));

    // Translate everything in ONE API call
  const translations = await this.translator.translateAll(uniqueTexts, lang);

    nodes.forEach(el => {
      const original = el.getAttribute('data-original')!;
      el.textContent = this.translator.get(original, lang);
    });

     // Apply translated placeholders
    inputs.forEach((el: any) => {
        const original = el.getAttribute('data-original-placeholder')!;
        el.placeholder = this.translator.get(original, lang);
    });

     // Show content
    document.body.classList.remove('lang-loading');
  }

  changeLanguage(lang: string) {
    localStorage.setItem('lang', lang);
    this.translator.clear();
    this.translatePage();
  }

  private restoreEnglish() {
    document.body.classList.remove('lang-loading');

    const nodes = document.querySelectorAll('[runtimeTranslate]');
    nodes.forEach(el => {
      const original = el.getAttribute('data-original');
      if (original) {
        el.textContent = original;
      }
    });
  }

  private restorePlaceholders() {
  const inputs = document.querySelectorAll('[runtimeTranslatePlaceholder]');
  inputs.forEach((el: any) => {
    const original = el.getAttribute('data-original-placeholder');
    if (original) {
      el.placeholder = original;
    }
  });
}
}
