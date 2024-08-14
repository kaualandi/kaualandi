import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { PageErrorComponent } from './page-error/page-error.component';
import { PageLoadingComponent } from './page-loading/page-loading.component';

@NgModule({
  imports: [PageErrorComponent, PageLoadingComponent],
  exports: [
    CommonModule,
    RouterModule,
    MatButtonModule,
    TranslateModule,
    PageErrorComponent,
    PageLoadingComponent,
  ],
})
export class SharedModule {}
