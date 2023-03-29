import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class SnackbarService {
  constructor(private snackbar: MatSnackBar) {}

  duration = 3000;
  button = 'fechar';

  error(message: string) {
    this.snackbar.open(message, this.button, {
      duration: this.duration,
      panelClass: ['error'],
    });
  }

  info(message: string) {
    this.snackbar.open(message, this.button, {
      duration: this.duration,
      panelClass: ['info'],
    });
  }

  success(message: string) {
    this.snackbar.open(message, this.button, {
      duration: this.duration,
      panelClass: ['success'],
    });
  }
}
