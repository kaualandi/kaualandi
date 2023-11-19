import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MatExpansionModule } from '@angular/material/expansion';
import { SharedModule } from 'src/app/components/shared/shared.module';
import { AboutRoutingModule } from './about-routing.module';
import { AboutComponent } from './about.component';
import { BioResumeComponent } from '../../components/about/bio-resume/bio-resume.component';
import { BioMoreAboutComponent } from '../../components/about/bio-more-about/bio-more-about.component';

@NgModule({
  declarations: [AboutComponent, BioResumeComponent, BioMoreAboutComponent],
  imports: [CommonModule, AboutRoutingModule, SharedModule, MatExpansionModule],
})
export class AboutModule {}
