import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent {
  year = new Date().getFullYear();

  whatsapp = 'https://wa.me/5521999222644';
  linkedin = 'https://www.linkedin.com/in/kaualandi/';
  instagram = 'https://www.instagram.com/kauaalandi/';
  github = 'https://github.com/kaualandi';
}
