import { Directive, HostListener, Input } from '@angular/core';
import { ValidationRules } from '../../core/constants/validation.constants';
import { regex } from '../../utils/regex-patterns';

@Directive({
    selector: '[lettersOnly]',
    standalone: true
})
export class LettersOnlyDirective {

    @Input() maxLength = ValidationRules.NAME.MAX_LENGTH;

    @HostListener('keypress', ['$event'])
    onKeyPress(event: KeyboardEvent) {
        if (!regex.ALLOW_CHARS.test(event.key)) {
            event.preventDefault(); // 🔥 blocks numbers & special chars
        }
    }

    @HostListener('input', ['$event'])
    onInput(event: Event) {
        const input = event.target as HTMLInputElement;

        // Replace multiple spaces with single space
        input.value = input.value.replace(/\s{2,}/g, ' ');

        if (input.value.length > this.maxLength) {
            input.value = input.value.slice(0, this.maxLength);
        }
    }
}
