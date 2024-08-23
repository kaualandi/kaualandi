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
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Router, RouterModule } from '@angular/router';
import { zoomInAnimation } from '@app/animations/route-animation';
import { LangSelectComponent } from '@app/components/shared/lang-select/lang-select.component';
import { IconDirective } from '@app/directives/icon.directive';
import { Genre } from '@app/models/user';
import { FormErrorPipe } from '@app/pipes/form-error.pipe';
import { AuthService } from '@app/services/auth.service';
import { BodyJson } from '@app/services/http.service';
import { cpfValidator } from '@app/validators/cpf.validator';
import { TranslateModule } from '@ngx-translate/core';
import { Score, zxcvbn, zxcvbnOptions } from '@zxcvbn-ts/core';
import * as zxcvbnCommonPackage from '@zxcvbn-ts/language-common';
import * as zxcvbnBrPackage from '@zxcvbn-ts/language-pt-br';
import moment from 'moment';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    RouterModule,
    IconDirective,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    ReactiveFormsModule,
    LangSelectComponent,
    MatButtonModule,
    TranslateModule,
    FormErrorPipe,
    MatTooltipModule,
    MatDatepickerModule,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [zoomInAnimation],
})
export class RegisterComponent implements OnInit {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);
  private toastr = inject(ToastrService);

  public loading = signal(false);
  public view_pass = false;
  public view_repass = false;
  public score: Score = 0;
  public password_warning = '';
  public password_suggestions: string[] = [];
  public now = moment();

  public form = this.fb.group({
    name: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', [Validators.required]],
    birth_date: [moment(), [Validators.required]],
    cpf: ['', [Validators.required, cpfValidator]],
    genre: [new FormControl<Genre>('M'), [Validators.required]],
    password: ['', [Validators.required, this.validScore()]],
    re_password: ['', [Validators.required, this.samePassword()]],
  });

  public ngOnInit(): void {
    this.form.get('birth_date')?.reset();

    this.form.get('password')?.valueChanges.subscribe((value) => {
      this.strengthPassword(value || '');
    });
  }

  public loginSubmitHandler() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.loading.set(true);

    this.authService.register(this.form.value as BodyJson).subscribe({
      next: () => {
        this.loading.set(false);
        this.router.navigate(['/login']);
        this.toastr.success('Registrado com sucesso!');
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

  public get password() {
    return this.form.get('password')?.value as string;
  }

  private strengthPassword(password: string) {
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
