import { DIALOG_DATA } from '@angular/cdk/dialog';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormErrorPipe } from '@app/pipes/form-error.pipe';
import { AuthService } from '@app/services/auth.service';
import { TranslateModule } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { IconDirective } from './../../../directives/icon.directive';

interface DialogProps {
  email: string;
}

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [
    MatDialogModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    TranslateModule,
    FormErrorPipe,
    IconDirective,
    MatButtonModule,
    MatInputModule,
  ],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ForgotPasswordComponent {
  private data: DialogProps = inject(DIALOG_DATA);
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private dialogRef = inject(MatDialogRef);
  private toastr = inject(ToastrService);

  public loading = signal(false);
  public form = this.fb.group({
    email: [this.data.email, [Validators.required, Validators.email]],
  });

  public handleFormSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.setLoading(true);
    this.authService.forgotPassword(this.form.value as string).subscribe({
      next: () => {
        this.setLoading(false);
        this.toastr.success('E-mail enviado com sucesso');
        this.dialogRef.close();
      },
      error: () => {
        this.setLoading(false);
      },
    });
  }

  public setLoading(value: boolean) {
    this.loading.set(value);
    this.dialogRef.disableClose = value;
  }
}
