import { AfterViewInit, Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[runtimeTranslate]',
  standalone: true
})
export class RuntimeTranslateDirective implements AfterViewInit {

  constructor(private el: ElementRef<HTMLElement>) {}

  ngAfterViewInit() {
    const text = this.el.nativeElement.innerText.trim();
    if (text) {
      this.el.nativeElement.setAttribute('data-original', text);
    }
  }
}
