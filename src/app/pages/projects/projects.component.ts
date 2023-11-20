import { Component, OnInit } from '@angular/core';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { IRepo } from 'src/app/models/projects';
import { ProjectsService } from 'src/app/services/projects.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
})
export class ProjectsComponent implements OnInit {
  constructor(private projectsService: ProjectsService) {}

  repos: IRepo[] = [];
  selectedTechs: string[] = [];
  tecnologies = [
    'angular',
    'react',
    'vanila',
    'nestjs',
    'nodejs',
    'nextjs',
    'express',
    'mongodb',
    'chatbot',
    'php',
  ];

  ngOnInit(): void {
    this.getRepos();
  }

  getRepos() {
    this.projectsService.getRepos().subscribe((repos) => {
      this.repos = repos.filter((repo) => !repo.fork);
    });
  }

  handleChangeFilterTechStatus(tech: string, event: MatCheckboxChange) {
    if (event.checked) {
      this.selectedTechs.push(tech);
    } else {
      this.selectedTechs = this.selectedTechs.filter(
        (selectedTech) => selectedTech !== tech
      );
    }
  }
}
