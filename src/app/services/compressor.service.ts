import { Injectable } from '@angular/core';
import { Observable, Observer } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CompressorService {
  max_width = 800;
  max_height = 800;

  compress(file: File, width?: number, height?: number): Observable<string> {
    this.max_width = width || 800;
    this.max_height = height || 800;

    const reader = new FileReader();
    reader.readAsDataURL(file);

    return Observable.create((observer: Observer<string>) => {
      reader.onload = (ev) => {
        const img = new Image();
        img.src = ((ev.target as FileReader).result as string) || '';

        img.onload = () => {
          const elem = document.createElement('canvas');
          let width = img.width;
          let height = img.height;

          if (width > height) {
            if (width > this.max_width) {
              // height *= max_width / width;
              height = Math.round((height *= this.max_width / width));
              width = this.max_width;
            }
          } else {
            if (height > this.max_height) {
              // width *= max_height / height;
              width = Math.round((width *= this.max_height / height));
              height = this.max_height;
            }
          }

          elem.width = width;
          elem.height = height;
          const ctx = <CanvasRenderingContext2D>elem.getContext('2d');
          ctx.drawImage(img, 0, 0, width, height);

          const base64img = ctx.canvas.toDataURL('image/png');
          observer.next(base64img);
        };

        reader.onerror = (error) => observer.error(error);
      };
    });
  }
}
