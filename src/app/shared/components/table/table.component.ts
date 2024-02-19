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
  @Input() total: number = 0;
  @Input() currentPageIndex: number = 0;
  @Input() loading: boolean;
  @Input() layout: 'fixed' | 'auto' = 'auto';
  @Output() pageIndexChange = new EventEmitter<number>();

  get displayedItemCount(): number {
    return Math.min(this.total, (this.currentPageIndex + 1) * this.pageSize);
  }

  get prevVisibilty(): boolean {
    return !this.currentPageIndex || !this.tableData.length
  }

  get nextVisibilty(): boolean {
    return this.displayedItemCount === this.total || !this.tableData.length
  }

  onNext(): void {
    this.currentPageIndex += 1;

    this.pageIndexChange.emit(this.currentPageIndex);
  }

  onPrev(): void {
    this.currentPageIndex -= 1;

    this.pageIndexChange.emit(this.currentPageIndex);
  }
}
