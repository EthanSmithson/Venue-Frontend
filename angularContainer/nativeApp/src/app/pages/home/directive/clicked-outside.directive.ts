import { Directive, ElementRef, EventEmitter, HostListener, Output } from '@angular/core';
import { ViewChild } from '@angular/core';

@Directive({
  selector: '[appClickedOutside]',
  standalone: true
})
export class ClickedOutsideDirective {

  constructor(private el: ElementRef) { }

  @Output() public clickedOutside = new EventEmitter();

  @HostListener('document:click', ['$event.target'])
  public onClick(target: any) {
    let fabBtn = document.getElementById("fabBtnV2")
    const clickedInsideFabBtn = fabBtn?.contains(target);
    const clickedInside = this.el.nativeElement.contains(target);
    const clickedInsideBtn = this.el.nativeElement.children[1].contains(target);
    if (!clickedInside) {
      this.clickedOutside.emit(true);
    } 
    else if (clickedInsideBtn && this.el.nativeElement.children[1].classList.contains("fab-button-close-active")) {
      this.el.nativeElement.activated = false
    }
  }

}
