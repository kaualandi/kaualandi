import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatExpansionModule } from '@angular/material/expansion';
import { SharedModule } from 'src/app/components/shared/shared.module';
import { ProjectsRoutingModule } from './projects-routing.module';
import { ProjectsComponent } from './projects.component';
import { ProjectCardComponent } from '../../components/projects/project-card/project-card.component';

@NgModule({
  declarations: [ProjectsComponent, ProjectCardComponent],
  imports: [
    CommonModule,
    ProjectsRoutingModule,
    SharedModule,
    MatExpansionModule,
    MatCheckboxModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class ProjectsModule {}
