import {
    Directive,
    ElementRef,
    forwardRef,
    HostListener
} from '@angular/core';
import {
    ControlValueAccessor,
    NG_VALUE_ACCESSOR
} from '@angular/forms';

@Directive({
  selector: '[usPhoneOrEmail]',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => UsPhoneOrEmailDirective),
      multi: true
    }
  ],
  standalone: true
})
export class UsPhoneOrEmailDirective implements ControlValueAccessor {

  private onChange!: (value: string) => void;
  private onTouched!: () => void;

  constructor(private el: ElementRef<HTMLInputElement>) {}

  // ===============================
  // Angular → Input
  // ===============================
  writeValue(value: string | null): void {
    if (!value) {
      this.el.nativeElement.value = '';
      return;
    }

    // digits only → format
    if (/^\d+$/.test(value)) {
      this.el.nativeElement.value = this.formatUS(value);
    } else {
      // email → show as-is
      this.el.nativeElement.value = value;
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  // ===============================
  // User → Angular
  // ===============================
  @HostListener('input')
  onInput() {
    const raw = this.el.nativeElement.value;

    // EMAIL MODE
    if (/[a-zA-Z@]/.test(raw)) {
      this.onChange(raw);
      return;
    }

    // PHONE MODE
    const clean = raw.replace(/\D/g, '').substring(0, 10);
    this.el.nativeElement.value = this.formatUS(clean);
    this.onChange(clean);
  }

  @HostListener('blur')
  onBlur() {
    this.onTouched();
  }

  // ===============================
  // Helpers
  // ===============================
  private formatUS(digits: string): string {
    if (digits.length <= 3) return digits;
    if (digits.length <= 6) {
      return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
    }
    return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
  }
}
