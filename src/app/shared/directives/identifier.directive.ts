import { Directive, EventEmitter, HostListener, Optional, Output } from '@angular/core';
import { NgControl } from '@angular/forms';
import { IdentifierEngineService } from '../../core/utils/identifier-engine.service';

@Directive({
  selector: '[userNameIdentifier]',
  standalone: true
})
export class UserNameIdentifierDirective {

  @Output() modeChange = new EventEmitter<'phone' | 'email'>();

  constructor(
    private engine: IdentifierEngineService,
    @Optional() private ngControl: NgControl
  ) {}

  @HostListener('input', ['$event'])
  onInput(event: Event) {
    const input = event.target as HTMLInputElement;
    const raw = input.value;

    const mode = this.engine.getMode(raw);
    const clean = this.engine.normalize(raw, mode);

    // 🔥 Emit mode to parent component
    this.modeChange.emit(mode);
    
    // Prevent infinite +1 loop
    if (input.value !== clean) {
        input.value = clean;
    }

    // IMPORTANT: Store ONLY clean digits in formControl
    if (this.ngControl?.control?.value !== clean) {
        this.ngControl?.control?.setValue(clean, { emitEvent: false });
    }

    this.ngControl?.control?.updateValueAndValidity({ onlySelf: true });
    
  }
}
