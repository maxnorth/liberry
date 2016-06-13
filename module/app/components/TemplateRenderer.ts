import { Component, ElementRef, DynamicComponentLoader, Input, ViewContainerRef } from 'angular2/core';
import {metadata} from "app/resources/metadata";
import {objectPath} from "app/utilities/objectPath";

@Component({
    selector: "[pattern][page]",
    template: "",
    providers: [DynamicComponentLoader]
})
export class PatternRenderer {
    constructor(public componentLoader: DynamicComponentLoader, public elementRef: ElementRef, public viewContainerRef: ViewContainerRef) {}

    @Input() pattern: string;

    ngOnInit() {
        var patternDef = objectPath.get(metadata, this.pattern);

        this.componentLoader.loadNextToLocation(getPatternComponent(patternDef), this.viewContainerRef)
    }
}

function getPatternComponent(patternDef) {
    //todo: registry for getting already loaded instances of a pattern?
    @Component({
        selector: `${patternDef.name}Pattern`
    })
    class RenderedPatternComponent {
        constructor(public elementRef: ElementRef) {

        }

        ngOnInit() {

        }

        pattern;

        runJQuery() {
            // or set $ and JQuery to JQuery wrapper of root element?
            // var $ = $(this.elementRef.nativeElement), 
            // JQuery = $;

            // set 'this' to root element
            (function() {
                eval(this.pattern.js)
            }).call(this.elementRef.nativeElement);
        }
    }

    Object.defineProperty(RenderedPatternComponent, "name", {
        value: `${patternDef.name}Pattern`
    })
}