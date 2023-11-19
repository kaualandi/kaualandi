import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BioMoreAboutComponent } from 'src/app/components/about/bio-more-about/bio-more-about.component';
import { BioResumeComponent } from 'src/app/components/about/bio-resume/bio-resume.component';
import { SkillsMainComponent } from 'src/app/components/about/skills-main/skills-main.component';
import { SkillsOtherComponent } from 'src/app/components/about/skills-other/skills-other.component';
import { SkillsSoonComponent } from 'src/app/components/about/skills-soon/skills-soon.component';
import { AboutComponent } from './about.component';

const routes: Routes = [
  {
    path: '',
    component: AboutComponent,
    children: [
      {
        path: 'bio/resume',
        component: BioResumeComponent,
      },
      {
        path: 'bio/know-me',
        component: BioMoreAboutComponent,
      },
      {
        path: 'skills/main',
        component: SkillsMainComponent,
      },
      {
        path: 'skills/other',
        component: SkillsOtherComponent,
      },
      {
        path: 'skills/soon',
        component: SkillsSoonComponent,
      },
      {
        path: '**',
        redirectTo: '',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AboutRoutingModule {}
