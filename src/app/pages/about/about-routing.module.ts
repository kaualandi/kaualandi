import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BioMoreAboutComponent } from 'src/app/components/about/bio-more-about/bio-more-about.component';
import { BioResumeComponent } from 'src/app/components/about/bio-resume/bio-resume.component';
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
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AboutRoutingModule {}
