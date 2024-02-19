import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { SvgIconComponent } from '../svg-icon/svg-icon.component';

@Component({
  selector: 'ax-table',
  standalone: true,
  imports: [CommonModule, MatButtonModule, SvgIconComponent],
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableComponent {
  @Input() tableData: any[] = [];
  @Input() showPagination: boolean;
  @Input() pageSize: number = 0;
  @Input() currentPage: number = 0;
  @Input() loading: boolean;
  @Input() layout: 'fixed' | 'auto' = 'auto';
  @Output() pageIndexChange = new EventEmitter<number>();

  onNext(): void {
    this.currentPage += 1;

    this.pageIndexChange.emit();
  }

  onPrev(): void {
    this.currentPage -= 1;

    this.pageIndexChange.emit();
  }
}
