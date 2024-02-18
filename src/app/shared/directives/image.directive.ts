import { Directive, ElementRef, Renderer2, AfterViewInit } from '@angular/core';

@Directive({
  selector: '[axImage]',
  standalone: true
})
export class ImageDirective implements AfterViewInit {

  constructor(private elementRef: ElementRef, private renderer: Renderer2) { }

  ngAfterViewInit() {
    const imgElement = this.elementRef.nativeElement as HTMLImageElement;

    this.renderer.setAttribute(imgElement, 'loading', 'lazy');
    this.renderer.setStyle(imgElement, 'background-color', 'lightblue');
    this.renderer.setStyle(imgElement, 'object-fit', 'cover');
    this.renderer.setStyle(imgElement, 'min-height', '100%');
    this.renderer.setStyle(imgElement, 'min-width', '100%');
  }
}