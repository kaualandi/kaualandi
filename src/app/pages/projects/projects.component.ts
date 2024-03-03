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
  reposBackup: IRepo[] = [];
  selectedTechs: string[] = [];
  hidden = true;
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
    'prisma',
    'php',
    'python',
    'django',
  ];

  ngOnInit(): void {
    this.getRepos();
  }

  getRepos() {
    this.projectsService.getRepos().subscribe((repos) => {
      this.reposBackup = repos.filter(
        (repo) => !repo.fork && !repo.topics.includes('hidden')
      );
      this.reloadFilters();
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

    this.reloadFilters();
  }

  reloadFilters() {
    this.repos = this.reposBackup.filter((repo) => {
      if (this.selectedTechs.length > 0) {
        return this.selectedTechs.some((tech) =>
          repo.topics.includes(tech.toLowerCase())
        );
      } else {
        return true;
      }
    });
  }
}
