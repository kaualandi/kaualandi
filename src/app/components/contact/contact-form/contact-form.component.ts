import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.scss'],
})
export class ContactFormComponent implements OnInit {
  constructor(private fb: FormBuilder) {}

  form = this.fb.group({
    name: [''],
    email: [''],
    phone: [''],
    message: [''],
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

  handleFormSubmit() {}

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
    console.log(value);

    return value;
  }
}
