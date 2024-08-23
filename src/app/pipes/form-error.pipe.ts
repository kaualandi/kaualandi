import { Pipe, PipeTransform } from '@angular/core';
import { ValidationErrors } from '@angular/forms';

@Pipe({
  name: 'formError',
  standalone: true,
})
export class FormErrorPipe implements PipeTransform {
  private error_prefix = 'errors.form';

  public transform(value: ValidationErrors | null): string {
    if (value) {
      const key = Object.keys(value)[0];
      return this.error_prefix + '.' + key;
    }

    return '';
  }
}
