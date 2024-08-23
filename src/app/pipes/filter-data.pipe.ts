import { Pipe, PipeTransform } from '@angular/core';
import { BodyJson } from '@app/services/http.service';

@Pipe({
  name: 'filterData',
  standalone: true,
})
export class FilterDataPipe implements PipeTransform {
  private prepareValue(value: string | null): string {
    return (value || '')
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase()
      .trim();
  }

  public transform(
    value: BodyJson[],
    filterValue: string | null,
    key = 'name'
  ): BodyJson[] {
    return value.filter((item) => {
      const value = item[key] as string;
      const filter = filterValue || '';

      return this.prepareValue(value).includes(this.prepareValue(filter));
    });
  }
}
