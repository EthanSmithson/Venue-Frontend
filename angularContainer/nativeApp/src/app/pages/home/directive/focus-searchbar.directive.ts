import { Directive, ElementRef, EventEmitter, Output, HostListener } from '@angular/core';

@Directive({
  selector: '[appFocusSearchbar]',
  standalone: true
})
export class FocusSearchbarDirective {

  constructor(private el: ElementRef) { }

  @Output() public focusSearchbar = new EventEmitter();

  @HostListener('document:click', ['$event.target'])
  public onClick(target: any) {
    let fabBtn = document.getElementById("fabBtnV2")
    const clickedInsideFabBtn = fabBtn?.contains(target);
    if (clickedInsideFabBtn) {
      this.focusSearchbar.emit(true);
    } 
  }

}
