import { ChangeDetectionStrategy, Component, ElementRef, Input, OnChanges, SimpleChanges } from '@angular/core';
import { SVG_ICONS } from 'src/app/constants';
import { SVG_ICONS_TYPE } from 'src/app/typings';

@Component({
  selector: 'ax-svg-icon',
  template: '<ng-content></ng-content>',
  styles: [
    `
      :host {
        display: inline-flex;
        align-items: center;
        justify-content: center;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true
})
export class SvgIconComponent implements OnChanges{
  @Input() size: number = 24;
  @Input() name: SVG_ICONS_TYPE;
  @Input() cursor: 'pointer' | 'default' = 'default';

  constructor(private element: ElementRef) {
    this.element.nativeElement.style.userSelect = 'none';
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.size) {
      this.element.nativeElement.style.width = `${this.size}px`;
      this.element.nativeElement.style.height = `${this.size}px`;
    }

    if (changes.cursor) {
      this.element.nativeElement.style.cursor = this.cursor;
    }

    if (changes.name) {
      const iconName: SVG_ICONS_TYPE = changes.name.currentValue;

      this.element.nativeElement.innerHTML = SVG_ICONS[iconName] || null;
    }
  }
}
