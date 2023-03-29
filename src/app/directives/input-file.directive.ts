import { Directive, EventEmitter, HostListener, Output } from '@angular/core';
import { EMPTY, expand, map } from 'rxjs';
import { CompressorService } from '../services/compressor.service';

@Directive({
  selector: '[inputFile]',
})
export class InputFileDirective {
  @Output() upload = new EventEmitter<string>();

  constructor(private compressor: CompressorService) {}

  @HostListener('change', ['$event']) handleInputChange(evt: Event) {
    evt.preventDefault();
    evt.stopPropagation();
    const files = (evt.target as HTMLInputElement).files;
    if (!files) return;

    if (files[0].type.startsWith('image')) {
      this.onImage(files);
      console.log('image');
    } else {
      this.onPdf(files);
      console.log('pdf');
    }
  }

  async onPdf(files: FileList) {
    const reader = new FileReader();
    reader.readAsDataURL(files[0]);
    reader.onloadend = () => {
      this.upload.emit(reader.result as string);
    };
  }

  async onImage(files: FileList) {
    if (files && files[0]) {
      const target = files;
      const compress = this.recursiveCompress(target[0], 0, target).pipe(
        expand((res) => {
          return res.index > res.array.length - 1
            ? EMPTY
            : this.recursiveCompress(target[res.index], res.index, target);
        })
      );
      compress.subscribe((res) => {
        if (res.index > res.array.length - 1) {
          this.upload.emit(res.data);
        }
      });
    }
  }

  recursiveCompress = (image: File, index: number, array: FileList) => {
    return this.compressor.compress(image).pipe(
      map((response) => {
        return {
          data: response,
          index: index + 1,
          array,
        };
      })
    );
  };
}
