import { Directive, ElementRef, EventEmitter, HostListener, Input, OnChanges, OnInit, Output, Renderer2, SimpleChanges } from '@angular/core';

@Directive({
  selector: '[ax-menu-item]'
})
export class MenuItemDirective implements OnChanges, OnInit {
  @Input('ax-selected') selected: boolean;
  @Output() clicked = new EventEmitter<void>();

  constructor(
      private el: ElementRef, 
      private renderer: Renderer2
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if(changes.selected.firstChange && changes.selected.currentValue) {
      this.onAddActive();
    }

    if(!changes.selected.firstChange && changes.selected.currentValue) {
      this.handleClick();
    }
  }

  ngOnInit(): void {
    this.initMenuItem();
  }

  @HostListener('click')
  handleClick() {
    this.clicked.emit();
  }

  private initMenuItem(): void {
    const element = this.el.nativeElement;

    this.renderer.addClass(element, 'ax-menu-item');
  }

  onAddActive(): void {
    const element = this.el.nativeElement;

    this.renderer.addClass(element, 'active')
  }

  onClearActive(): void {
    const element = this.el.nativeElement;

    this.renderer.removeClass(element, 'active')
  }
}
