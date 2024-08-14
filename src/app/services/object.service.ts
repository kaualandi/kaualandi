import { Injectable } from '@angular/core';
import { BodyJson } from './http.service';

@Injectable({
  providedIn: 'root',
})
export class ObjectService {
  public removeEmptyValues(data: BodyJson) {
    for (const key in data) {
      if (data[key] === null || data[key] === undefined) {
        delete data[key];
      }
    }
    return data;
  }
}
