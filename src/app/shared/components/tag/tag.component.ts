import { ChangeDetectionStrategy, Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TagType } from 'src/app/typings';
import { TAG_NAME } from 'src/app/constants';


@Component({
  selector: 'ax-tag',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tag.component.html',
  styleUrls: ['./tag.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TagComponent implements OnChanges {
  @Input() tagType: TagType;

  tagName: string;

  ngOnChanges(changes: SimpleChanges): void {
    if(changes.tagType) {
      this.tagName = TAG_NAME[changes.tagType.currentValue];
    }
  }
}
