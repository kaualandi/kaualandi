import {
  Directive,
  EventEmitter,
  HostListener,
  inject,
  Input,
  Output,
} from '@angular/core';
import { CompressorService } from '@app/services/compressor.service';
import { from, map, mergeMap, Observable } from 'rxjs';

export interface IInputFileEvent {
  name: string;
  base64: string;
  file: File;
}

@Directive({
  selector: '[inputFile]',
  standalone: true,
})
export class InputFileDirective {
  @Output() public upload = new EventEmitter<IInputFileEvent>();
  @Input() public inputFile = 'base64';
  @Input() public compress = true;

  private compressor = inject(CompressorService);

  @HostListener('change', ['$event']) public handleInputChange(evt: Event) {
    evt.preventDefault();
    evt.stopPropagation();
    const files = (evt.target as HTMLInputElement).files;
    if (!files || !files.length) return;

    if (this.allImages(files) && this.compress) {
      this.onImage(files);
      console.log('image');
    } else {
      this.onFile(files);
      console.log('pdf');
    }
  }

  private allImages = (files: FileList) => {
    return Array.from(files).every((file) => file.type.startsWith('image'));
  };

  private onFile(files: FileList) {
    const pdfs = from(files).pipe(mergeMap((file) => this.readFile(file)));

    pdfs.subscribe((result: IInputFileEvent) => {
      this.upload.emit(result);
    });
  }

  private readFile = (file: File) => {
    const reader = new FileReader();
    const observable = new Observable<IInputFileEvent>((ob) => {
      reader.onload = () => {
        ob.next({
          name: file.name,
          base64: reader.result as string,
          file,
        });
        ob.complete();
      };
    });

    reader.readAsDataURL(file);

    return observable;
  };

  private onImage(files: FileList) {
    const compress = from(files).pipe(
      mergeMap((file, index) => this.recursiveCompress(file, index, files))
    );

    compress.subscribe((res) => {
      this.upload.emit({
        name: res.array[res.index].name,
        base64: res.data,
        file: res.array[res.index],
      });
    });
  }

  private recursiveCompress = (image: File, index: number, array: FileList) => {
    return this.compressor.compress(image).pipe(
      map((response) => {
        return {
          data: response,
          index,
          array,
        };
      })
    );
  };
}
