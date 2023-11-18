import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, startWith } from 'rxjs';

interface AnyOption {
  [key: string]: string | number | boolean | AnyOption | AnyOption[] | null;
}

@Component({
  selector: 'autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.scss'],
})
export class AutocompleteComponent implements OnInit {
  @Output() valueChange = new EventEmitter();
  @Output() selected = new EventEmitter();
  @Input() control: AbstractControl | null = null;
  @Input() options: AnyOption[] = [];
  @Input() displayFnKey = 'name';
  @Input() placeholder = '';
  @Input() label = '';
  @Input() icon = '';

  randomNumber = Math.random() * 1000;

  ngOnInit(): void {
    this.control?.valueChanges
      .pipe(startWith(''), debounceTime(500), distinctUntilChanged())
      .subscribe((value) => {
        this.valueChange.emit(value);
        if (typeof value === 'object') {
          this.selected.emit(value);
          this.control?.setValue(value);
        }
      });
  }

  displayFn(option: AnyOption) {
    return option && option[this.displayFnKey]
      ? option[this.displayFnKey] + ''
      : '';
  }

  fc() {
    return this.control as FormControl;
  }
}
