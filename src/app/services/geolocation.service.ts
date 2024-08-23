import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GeolocationService {
  public getCurrentPosition(): Observable<GeolocationPosition> {
    return new Observable((observer) => {
      if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            observer.next(position);
            observer.complete();
          },
          (error) => {
            observer.error(error);
          }
        );
      } else {
        const error = {
          code: 0,
          message: 'Navegador incompatível, atualize-o ou tente com outro.',
        } as GeolocationPositionError;
        observer.error(error);
      }
    });
  }
}
