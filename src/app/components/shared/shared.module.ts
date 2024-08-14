import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  exports: [CommonModule, RouterModule, MatButtonModule, TranslateModule],
})
export class SharedModule {}
