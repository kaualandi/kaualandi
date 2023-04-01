import { Contact } from './../../../models/contact';
import { ContactService } from './../../../services/contact.service';
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
})
export class ContactComponent {
  constructor(
    private fb: FormBuilder,
    private contactService: ContactService
  ) {}

  loading = false;
  statusSent: 'ok' | 'error' | null = null;

  contactForm = this.fb.group({
    name: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    message: ['', [Validators.required]],
  });

  removeSentStatus() {
    setTimeout(() => {
      this.statusSent = null;
    }, 3000);
  }

  handleSubmit() {
    if (!this.contactForm.valid) return;

    this.loading = true;

    const form = this.contactForm.value as Contact;
    this.contactService.sendForm(form).subscribe({
      next: (response) => {
        console.log(response);
        this.loading = false;
        this.statusSent = 'ok';
        this.removeSentStatus();
      },
      error: (error) => {
        console.log(error);
        this.loading = false;
        this.statusSent = 'error';
        this.removeSentStatus();
      },
    });
  }
}
