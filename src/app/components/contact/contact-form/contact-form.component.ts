import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { IContactData } from 'src/app/models/contact';
import { ContactService } from 'src/app/services/contact.service';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.scss'],
})
export class ContactFormComponent implements OnInit {
  @Output() sended = new EventEmitter();

  constructor(
    private fb: FormBuilder,
    private contactService: ContactService
  ) {}

  loading = false;

  form = this.fb.group({
    name: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', [Validators.required]],
    message: ['', [Validators.required]],
  });

  lines = [
    `<p>const</p> <b>button</b> <p>=</p> <b>document</b><g>.</g><b>querySelector</b><g>(</g><o>"#send-button"</o><g>);</g>`,
    ``,
    `<p>const</p> <b>message</b> <p>=</p> <g>{</g>`,
    `<t/><b>name</b><g>:</g> <o>"${this.form.value.name}"</o><g>,</g>`,
    `<t/><b>email</b><g>:</g> <o>"${this.form.value.email}"</o><g>,</g>`,
    `<t/><b>phone</b><g>:</g> <o>"${this.form.value.phone}"</o><g>,</g>`,
    `<t/><b>message</b><g>:</g> <o>"${this.form.value.message}"</o><g>,</g>`,
    `<t/><b>date</b><g>:</g> <o>"${new Date().toLocaleString()}"</o>`,
    `<g>}</g>`,
    ``,
    `<b>button</b><g>.</g><b>addEventListener</b><g>(</g><o>"click"</o><g>, ()</g> <p>=></p> <g>{</g>`,
    `<t/><b>form</b><g>.</g><b>send</b><g>(</g><b>message</b><g>);</g>`,
    `<g>});</g>`,
  ];

  ngOnInit(): void {
    this.form.valueChanges.subscribe((value) => {
      this.lines[3] = `<t/><b>name</b><g>:</g> <o>"${value.name}"</o><g>,</g>`;
      this.lines[4] = `<t/><b>email</b><g>:</g> <o>"${value.email}"</o><g>,</g>`;
      this.lines[5] = `<t/><b>phone</b><g>:</g> <o>"${value.phone}"</o><g>,</g>`;
      this.lines[6] = `<t/><b>message</b><g>:</g> <o>"${value.message}"</o><g>,</g>`;
    });
  }

  handleFormSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.loading = true;
    const form = this.form.value;

    const data: IContactData = {
      name: 'Portfólio para devs',
      subject: 'Nova mensagem para contato',
      infors: [
        {
          label: 'Nome',
          value: form.name as string,
        },
        {
          label: 'Email',
          value: form.email as string,
        },
        {
          label: 'Telefone',
          value: form.phone as string,
        },
        {
          label: 'Mensagem',
          value: form.message as string,
        },
      ],
    };

    this.contactService.sendEmail(data).subscribe({
      next: () => {
        this.loading = false;
        this.sended.emit();
        this.form.patchValue({
          name: '',
          email: '',
          phone: '',
          message: '',
        });
        this.form.markAsUntouched();
      },
      error: () => {
        this.loading = false;
      },
    });
  }

  transform(value: string): string {
    value = value.split('"').join('&#39;');
    value = value.split('<t/>').join('&nbsp;&nbsp;&nbsp;&nbsp;');
    value = value.split('<b>').join('<span class="code-blue">');
    value = value.split('</b>').join('</span>');
    value = value.split('<g>').join('<span class="code-gray">');
    value = value.split('</g>').join('</span>');
    value = value.split('<o>').join('<span class="code-orange">');
    value = value.split('</o>').join('</span>');
    value = value.split('<p>').join('<span class="code-purple">');
    value = value.split('</p>').join('</span>');

    return value;
  }
}
