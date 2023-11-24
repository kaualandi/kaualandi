import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatExpansionModule } from '@angular/material/expansion';
import { NgxMaskDirective } from 'ngx-mask';
import { SharedModule } from 'src/app/components/shared/shared.module';
import { ContactFormComponent } from '../../components/contact/contact-form/contact-form.component';
import { ContactRoutingModule } from './contact-routing.module';
import { ContactComponent } from './contact.component';

@NgModule({
  declarations: [ContactComponent, ContactFormComponent],
  imports: [
    CommonModule,
    ContactRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    MatExpansionModule,
    NgxMaskDirective,
  ],
})
export class ContactModule {}
