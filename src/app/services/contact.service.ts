import { Injectable } from '@angular/core';
import { IContactData } from '../models/contact';
import { BodyJson, HttpService } from './http.service';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  constructor(private http: HttpService) {}

  sendEmail(data: IContactData) {
    data.company = 3;
    return this.http.post(
      `https://emails.noclaf.com.br/core/send-email/`,
      data as unknown as BodyJson
    );
  }
}
