import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { SvgIconComponent } from '../svg-icon/svg-icon.component';
import {CdkMenu, CdkMenuGroup, CdkMenuItem, CdkMenuItemRadio, CdkMenuTrigger} from '@angular/cdk/menu';
import { FilterItem } from 'src/app/typings';


@Component({
  selector: 'ax-filter',
  standalone: true,
  imports: [
    CommonModule, 
    MatButtonModule,  
    CdkMenuGroup, 
    SvgIconComponent, 
    CdkMenu,
    CdkMenuItem,
    CdkMenuItemRadio, 
    CdkMenuTrigger
  ],
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FilterComponent implements OnChanges{
  @Input() filterList: FilterItem[] = [];
  @Output() clicked = new EventEmitter<FilterItem>();

  currentFilter: FilterItem;

  ngOnChanges(changes: SimpleChanges): void {
    if(changes.filterList) {
      this.currentFilter = this.filterList[0];
    }
  }

  onSelect(type: FilterItem): void {
    this.currentFilter = type;
    this.clicked.emit(type);
  }
}
