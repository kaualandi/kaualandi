import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
})
export class AboutComponent implements OnInit {
  myYearsOld = 18;

  skills = [
    'JavaScript',
    'TypeScript',
    'SASS',
    'Angular',
    'React',
    'Design Responsivo',
    'SEO',
    'Node.js',
    'Express',
    'MongoDB',
    'NestJS',
    'MySQL',
    'GIT',
    'GitHub',
  ];

  moreSkills = ['Excel', 'Hackintosh', 'Hardware', 'Linux'];

  ngOnInit(): void {
    this.calculateMyAge();
  }

  calculateMyAge() {
    const myBirthday = new Date('2005-10-02');
    const today = new Date();
    let myAge = today.getFullYear() - myBirthday.getFullYear();
    const month = today.getMonth() - myBirthday.getMonth();
    if (month < 0 || (month === 0 && today.getDate() < myBirthday.getDate())) {
      myAge--;
    }
    this.myYearsOld = myAge;
  }
}
