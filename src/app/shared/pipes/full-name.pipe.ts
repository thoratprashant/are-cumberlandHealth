import { Pipe, PipeTransform } from '@angular/core';

/**
 * Full Name Pipe
 * Centralized name formatting for entire app
 */
@Pipe({
  name: 'fullName',
  standalone: true
})
export class FullNamePipe implements PipeTransform {

  transform(
    firstName?: string,
    middleName?: string,
    lastName?: string
  ): string {
    return [lastName, middleName, firstName]
      .filter(Boolean)
      .join(' ');
  }
}
