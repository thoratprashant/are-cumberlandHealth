import { AfterViewInit, Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[runtimeTranslatePlaceholder]',
  standalone: true
})
export class RuntimeTranslatePlaceholderDirective implements AfterViewInit {

  constructor(private el: ElementRef<HTMLInputElement>) {}

  ngAfterViewInit() {
    const placeholder = this.el.nativeElement.getAttribute('placeholder');
    if (placeholder) {
      this.el.nativeElement.setAttribute('data-original-placeholder', placeholder);
    }
  }
}
