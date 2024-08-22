import { Injectable } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { TranslateParser, TranslateService } from '@ngx-translate/core';

@Injectable()
export class NgxMatPaginatorIntl extends MatPaginatorIntl {
  public rangeLabelIntl = '';

  public constructor(
    private translateService: TranslateService,
    private translateParser: TranslateParser
  ) {
    super();
    translateService.onLangChange.pipe(takeUntilDestroyed()).subscribe(() => {
      this.getTranslations();
    });
    this.getTranslations();
  }

  public getTranslations() {
    this.translateService
      .get([
        'paginator.items_per_page',
        'paginator.next_page',
        'paginator.previous_page',
        'paginator.range',
        'paginator.first_page',
        'paginator.last_page',
      ])
      .subscribe((translation) => {
        this.itemsPerPageLabel = translation['paginator.items_per_page'];
        this.nextPageLabel = translation['paginator.next_page'];
        this.previousPageLabel = translation['paginator.previous_page'];
        this.rangeLabelIntl = translation['paginator.range'];
        this.firstPageLabel = translation['paginator.first_page'];
        this.lastPageLabel = translation['paginator.last_page'];
        this.changes.next();
      });
  }

  public override getRangeLabel = (
    page: number,
    pageSize: number,
    length: number
  ) => {
    length = Math.max(length, 0);
    const start = page * pageSize;
    const end =
      start < length ? Math.min(start + pageSize, length) : start + pageSize;
    return this.translateParser.interpolate(this.rangeLabelIntl, {
      start,
      end,
      length,
    }) as string;
  };
}
