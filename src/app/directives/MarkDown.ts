import { Directive, ElementRef, DynamicComponentLoader } from '@angular/core';

@Directive({
    selector: "[pattern][page]",
    providers: [ ElementRef ]
})
export class MarkDownTranslator {
    constructor(elementRef: ElementRef) {

    }
}