import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MatExpansionModule } from '@angular/material/expansion';
import { SharedModule } from 'src/app/components/shared/shared.module';
import { AboutRoutingModule } from './about-routing.module';
import { AboutComponent } from './about.component';
import { BioResumeComponent } from '../../components/about/bio-resume/bio-resume.component';
import { BioMoreAboutComponent } from '../../components/about/bio-more-about/bio-more-about.component';
import { SkillsMainComponent } from '../../components/about/skills-main/skills-main.component';
import { SkillsOtherComponent } from '../../components/about/skills-other/skills-other.component';
import { SkillsSoonComponent } from '../../components/about/skills-soon/skills-soon.component';

@NgModule({
  declarations: [AboutComponent, BioResumeComponent, BioMoreAboutComponent, SkillsMainComponent, SkillsOtherComponent, SkillsSoonComponent],
  imports: [CommonModule, AboutRoutingModule, SharedModule, MatExpansionModule],
})
export class AboutModule {}
