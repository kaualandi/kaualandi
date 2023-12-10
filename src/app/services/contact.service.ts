import { Injectable } from '@angular/core';
import { IContactData } from '../models/contact';
import { BodyJson, HttpService } from './http.service';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  constructor(private http: HttpService) {}

  sendEmail(data: IContactData) {
    return this.http.post(
      `https://formsubmit.kaualf.com/send-mail/eu@kaualf.com`,
      data as unknown as BodyJson
    );
  }
}
