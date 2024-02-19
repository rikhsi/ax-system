import { Directive, ElementRef, EventEmitter, OnDestroy, Output } from '@angular/core';

@Directive({
  selector: '[axResize]'
})
export class ResizeDirective implements OnDestroy {
  @Output() resize = new EventEmitter<DOMRectReadOnly>();

  private resizeObserver$: ResizeObserver;

  constructor(public el: ElementRef<HTMLElement>) {
    this.initObserver(); 
  }

  private initObserver(): void {    
    this.resizeObserver$ = new ResizeObserver(entries => {
      this.resize.emit(entries[0].contentRect);
    });

    this.resizeObserver$.observe(this.el.nativeElement);
  }

  ngOnDestroy(): void {
    this.resizeObserver$.disconnect();
  }

}
