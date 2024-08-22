import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { RouterModule } from '@angular/router';
import { IconDirective } from '@app/directives/icon.directive';
import { InitialLettersDirective } from '@app/directives/initial-letters.directive';
import { TranslateModule } from '@ngx-translate/core';
import { AvatarComponent } from './avatar/avatar.component';
import { PageErrorComponent } from './page-error/page-error.component';
import { PageLoadingComponent } from './page-loading/page-loading.component';

@NgModule({
  imports: [
    PageErrorComponent,
    PageLoadingComponent,
    AvatarComponent,
    InitialLettersDirective,
    IconDirective,
  ],
  exports: [
    CommonModule,
    RouterModule,
    MatButtonModule,
    TranslateModule,
    PageErrorComponent,
    PageLoadingComponent,
    ReactiveFormsModule,
    MatSelectModule,
    AvatarComponent,
    InitialLettersDirective,
    IconDirective,
  ],
})
export class SharedModule {}
