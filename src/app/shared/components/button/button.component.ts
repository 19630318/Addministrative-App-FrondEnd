import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { COLORS, Colors } from '../../../models/colors.models';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './button.component.html'
})
export class ButtonComponent {

  @Input() disabled = false;
  @Input() loading = false;
  @Input() typeBtn: 'reset' | 'submit' | 'button' = 'button';
  @Input() color: Colors = 'primary';
  @Input() title = '';
  faSpinner = faSpinner;

  mapColors = COLORS

  constructor() {}

  get colors() {
    const colors = this.mapColors[this.color];
    if (colors) {
      return colors;
    }
    return {};
  }
  
}
