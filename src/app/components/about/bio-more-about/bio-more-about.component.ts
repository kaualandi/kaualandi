import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-bio-more-about',
  templateUrl: './bio-more-about.component.html',
  styleUrls: ['./bio-more-about.component.scss'],
})
export class BioMoreAboutComponent implements OnInit {
  myYearsOld = 18;

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
