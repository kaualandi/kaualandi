import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { zoomInAnimation } from '@app/animations/route-animation';
import { LangSelectComponent } from '@app/components/shared/lang-select/lang-select.component';
import { IconDirective } from '@app/directives/icon.directive';
import { FormErrorPipe } from '@app/pipes/form-error.pipe';
import { AuthService } from '@app/services/auth.service';
import { TranslateModule } from '@ngx-translate/core';
import { zxcvbn, zxcvbnOptions } from '@zxcvbn-ts/core';
import * as zxcvbnCommonPackage from '@zxcvbn-ts/language-common';
import * as zxcvbnBrPackage from '@zxcvbn-ts/language-pt-br';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-rescure-password',
  standalone: true,
  imports: [
    IconDirective,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatTooltipModule,
    FormErrorPipe,
    TranslateModule,
    LangSelectComponent,
    RouterModule,
  ],
  templateUrl: './rescure-password.component.html',
  styleUrl: './rescure-password.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [zoomInAnimation],
})
export class RescurePasswordComponent implements OnInit {
  private fb = inject(FormBuilder);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private authService = inject(AuthService);
  private toastr = inject(ToastrService);

  private email = '';
  private hash = '';

  public loading = signal(false);
  public view_pass = false;
  public view_repass = false;

  public form = this.fb.group({
    password: ['', [Validators.required, this.validScore()]],
    re_password: ['', [Validators.required, this.samePassword()]],
  });

  public score = 0;
  public password_warning = '';
  public password_suggestions: string[] = [];

  public ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.email = params['email'];
      this.hash = params['hash'];

      if (!this.email || !this.hash) {
        this.router.navigate(['/']);
      }
    });

    this.form.get('password')?.valueChanges.subscribe((value) => {
      this.strengthPassword(value || '');
    });
  }

  public handleFormSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.loading.set(true);

    const body = {
      email: this.email,
      forgot_password_hash: this.hash,
      new_password: this.form.value.password,
    };

    this.authService.rescurePassword(body).subscribe({
      next: () => {
        this.loading.set(false);
        this.toastr.success('Senha alterada com sucesso!');
        this.router.navigate(['/login']);
      },
      error: () => {
        this.loading.set(false);
      },
    });
  }

  private samePassword() {
    return (control: AbstractControl) => {
      const password = control.value;
      if (password) {
        if (password !== this.form.value.password) {
          return { diff_password: true };
        }
      }
      return null;
    };
  }

  private validScore() {
    return (control: AbstractControl) => {
      const password = control.value;
      if (password) {
        if (this?.score < 3) {
          return { poor_password: true };
        }
      }
      return null;
    };
  }

  public strengthPassword(password: string) {
    const options = {
      translations: zxcvbnBrPackage.translations,
      graphs: zxcvbnCommonPackage.adjacencyGraphs,
      dictionary: {
        ...zxcvbnCommonPackage.dictionary,
        ...zxcvbnBrPackage.dictionary,
      },
    };
    zxcvbnOptions.setOptions(options);
    const passwordStatus = zxcvbn(password);
    this.score = passwordStatus.score;
    this.password_warning = passwordStatus.feedback.warning || '';
    this.password_suggestions = passwordStatus.feedback.suggestions;
  }
}
