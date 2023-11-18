import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
})
export class PaginationComponent {
  @Input() back = false;
  @Input() next = false;
  @Input() current = 1;
  @Input() total = 1;
  @Output() page_change = new EventEmitter<number>();

  handlePageChange(page: number) {
    this.page_change.emit(page);
  }
}
