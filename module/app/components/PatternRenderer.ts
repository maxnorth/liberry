import { Component, ElementRef, DynamicComponentLoader } from 'angular2/core';

@Component({
    selector: "[pattern][page]",
    template: "",
    providers: [DynamicComponentLoader]
})
export class PatternRenderer {
    constructor(componentLoader: DynamicComponentLoader, elementRef: ElementRef) {
        
        componentLoader.loadIntoLocation(this.component, elementRef, "container")
    }
    
    component;
}