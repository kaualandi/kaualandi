import { AbstractControl } from '@angular/forms';

export function cnpjValidator(control: AbstractControl) {
  const cnpj = control.value;
  if (cnpj) {
    const cnpjWithoutMask = cnpj.replace(/[^\d]+/g, '');
    if (cnpjWithoutMask.length !== 14) {
      return { cnpj: true };
    }
    let size = cnpjWithoutMask.length - 2;
    let numbers = cnpjWithoutMask.substring(0, size);
    const digits = cnpjWithoutMask.substring(size);
    let sum = 0;
    let pos = size - 7;
    for (let i = size; i >= 1; i--) {
      sum += numbers.charAt(size - i) * pos--;
      if (pos < 2) {
        pos = 9;
      }
    }
    let result = sum % 11 < 2 ? 0 : 11 - (sum % 11);
    if (result !== Number(digits.charAt(0))) {
      return { cnpj: true };
    }
    const digitsEquals = cnpjWithoutMask
      .split('')
      .every((val: number, i: number, arr: number[]) => val === arr[0]);
    if (digitsEquals) {
      return { cnpj: true };
    }
    size = size + 1;
    numbers = cnpjWithoutMask.substring(0, size);
    sum = 0;
    pos = size - 7;
    for (let i = size; i >= 1; i--) {
      sum += numbers.charAt(size - i) * pos--;
      if (pos < 2) {
        pos = 9;
      }
    }
    result = sum % 11 < 2 ? 0 : 11 - (sum % 11);
    if (result !== Number(digits.charAt(1))) {
      return { cnpj: true };
    }
  }
  return null;
}
