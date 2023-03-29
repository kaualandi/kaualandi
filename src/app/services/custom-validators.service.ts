import { Injectable } from '@angular/core';
import { ValidatorFn } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class CustomValidatorsService {
  cnpj(): ValidatorFn {
    return (control) => {
      const cnpj = control.value;
      if (cnpj) {
        const cnpjWithoutMask = cnpj.replace(/[^\d]+/g, '');
        if (cnpjWithoutMask.length !== 14) {
          return { invalidCnpj: true };
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
          return { invalidCnpj: true };
        }
        const digitsEquals = cnpjWithoutMask
          .split('')
          .every((val: number, i: number, arr: number[]) => val === arr[0]);
        if (digitsEquals) {
          return { invalidCnpj: true };
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
          return { invalidCnpj: true };
        }
      }
      return null;
    };
  }

  cpf(): ValidatorFn {
    return (control) => {
      const cpf = control.value;
      if (cpf) {
        const cpfWithoutMask = cpf.replace(/[^\d]+/g, '');
        if (cpfWithoutMask.length !== 11) {
          return { invalidCpf: true };
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
          return { invalidCpf: true };
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
          return { invalidCpf: true };
        }
        const digitsEquals = cpfWithoutMask
          .split('')
          .every((val: number, i: number, arr: number[]) => val === arr[0]);
        if (digitsEquals) {
          return { invalidCpf: true };
        }
      }
      return null;
    };
  }
}
