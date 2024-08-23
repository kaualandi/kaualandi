import { AbstractControl } from '@angular/forms';

export function cpfValidator(control: AbstractControl) {
  const cpf = control.value;
  if (cpf) {
    const cpfWithoutMask = cpf.replace(/[^\d]+/g, '');
    if (cpfWithoutMask.length !== 11) {
      return { cpf: true };
    }
    let sum = 0;
    let rest;
    for (let i = 1; i <= 9; i++) {
      sum = sum + parseInt(cpfWithoutMask.substring(i - 1, i)) * (11 - i);
    }
    rest = (sum * 10) % 11;
    if (rest === 10 || rest === 11) {
      rest = 0;
    }
    if (rest !== parseInt(cpfWithoutMask.substring(9, 10))) {
      return { cpf: true };
    }
    sum = 0;
    for (let i = 1; i <= 10; i++) {
      sum = sum + parseInt(cpfWithoutMask.substring(i - 1, i)) * (12 - i);
    }
    rest = (sum * 10) % 11;
    if (rest === 10 || rest === 11) {
      rest = 0;
    }
    if (rest !== parseInt(cpfWithoutMask.substring(10, 11))) {
      return { cpf: true };
    }
    const digitsEquals = cpfWithoutMask
      .split('')
      .every((val: number, i: number, arr: number[]) => val === arr[0]);
    if (digitsEquals) {
      return { cpf: true };
    }
  }
  return null;
}
