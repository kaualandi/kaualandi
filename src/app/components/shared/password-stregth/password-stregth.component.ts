import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { Score, zxcvbn, zxcvbnOptions } from '@zxcvbn-ts/core';
import * as zxcvbnCommonPackage from '@zxcvbn-ts/language-common';
import * as zxcvbnBrPackage from '@zxcvbn-ts/language-pt-br';

@Component({
  selector: 'app-password-stregth',
  standalone: true,
  imports: [],
  templateUrl: './password-stregth.component.html',
  styleUrl: './password-stregth.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PasswordStregthComponent implements OnChanges {
  @Input() public password = '';
  @Output() public score = new EventEmitter<Score>();

  public password_warning = '';
  public password_suggestions: string[] = [];

  public ngOnChanges(changes: SimpleChanges) {
    if (changes['password']) {
      this.strengthPassword(changes['password'].currentValue);
    }
  }

  private strengthPassword(password: string) {
    const options = {
      translations: zxcvbnBrPackage.translations,
      graphs: zxcvbnCommonPackage.adjacencyGraphs,
      dictionary: {
        ...zxcvbnCommonPackage.dictionary,
        ...zxcvbnBrPackage.dictionary,
      },
    };
    zxcvbnOptions.setOptions(options);
    const passwordStatus = zxcvbn(password);
    this.password_warning = passwordStatus.feedback.warning || '';
    this.password_suggestions = passwordStatus.feedback.suggestions;
    this.score.emit(passwordStatus.score);
  }
}
