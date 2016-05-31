import { Directive, ElementRef, DynamicComponentLoader } from 'angular2/core';

@Directive({
    selector: "[pattern][page]",
    providers: [ ElementRef ]
})
export class MarkDownTranslator {
    constructor(elementRef: ElementRef) {
        
    }
}