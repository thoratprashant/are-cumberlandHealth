import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RuntimeTranslateDirective } from '../../core/i18n/runtime-translate.directive';
import { RuntimeTranslateManager } from '../../core/i18n/runtime-translate.manager';

@Component({
  selector: 'app-auth-layout',
  standalone: true,
  imports: [RouterOutlet, RuntimeTranslateDirective],
  templateUrl: './auth-layout.component.html',
  styleUrl: './auth-layout.component.scss',
})
export class AuthLayoutComponent {

  selectedLanguageLabel = 'English';

  constructor(private i18n: RuntimeTranslateManager) {
    this.syncLanguageLabel();
  }

  changeLang(lang: string) {
    localStorage.setItem('lang', lang);
    this.syncLanguageLabel();
    this.i18n.changeLanguage(lang);
  }

  private syncLanguageLabel() {
    const lang = localStorage.getItem('lang') || 'en';

    const map: Record<string, string> = {
      en: 'English',
      es: 'Spanish',
      fr: 'French',
      zh: 'Chinese'
    };

    this.selectedLanguageLabel = map[lang];
  }
  
}
