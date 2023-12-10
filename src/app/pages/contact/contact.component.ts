import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IActivityBarFile } from 'src/app/models/ide';
import { CONTACT_ACTIVITY_BAR } from './../../constants/activity-bar-contact';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
})
export class ContactComponent implements OnInit {
  constructor(private router: Router) {}

  activityBar = CONTACT_ACTIVITY_BAR;
  activeFile = {} as IActivityBarFile;
  hidden = true;
  thanks = false;

  ngOnInit(): void {
    this.router.events.subscribe({
      next: () => {
        this.findActivePageByRoute();
      },
    });
  }

  activePage(file: IActivityBarFile) {
    this.activeFile = file;
  }

  findActivePageByRoute() {
    const route = this.router.url;
    this.activityBar.forEach(({ files, folders }) => {
      files.forEach((file) => {
        if (file.route === route) {
          this.activePage(file);
        }
      });

      folders.forEach((folder) => {
        folder.files.forEach((file) => {
          if (file.route === route) {
            this.activePage(file);
          }
        });
      });
    });
  }
}
