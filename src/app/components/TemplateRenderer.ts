import { Component, ElementRef, DynamicComponentLoader, Input, ViewContainerRef } from '@angular/core';
import {metadata} from "app/resources/metadata";
import {objectPath} from "app/utilities/objectPath";

const {site, library} = metadata;

@Component({
    selector: "[pattern][page]",
    template: "",
    providers: [DynamicComponentLoader]
})
export class PatternRenderer {
    constructor(public componentLoader: DynamicComponentLoader, public elementRef: ElementRef, public viewContainerRef: ViewContainerRef) {}

    @Input() context: string;

    ngOnInit() {
        this.setView();
    }

    setView() {
        var patternDef = objectPath.get(metadata, this.pattern);

        this.componentLoader.loadNextToLocation(getPatternComponent(patternDef), this.viewContainerRef)
    }
}

function getPatternComponent(patternDef) {
    //todo: registry for getting already loaded instances of a pattern?
    if (site._components[`Pattern@${patternDef.path}`]) return site._patternComponents[patternDef.path];

    site._patternComponents[patternDef.path] = RenderedPatternComponent;

    @Component({
        selector: `[pattern="${patternDef.path}"]`
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
        value: `Pattern@${patternDef.path}`
    });

    return RenderedPatternComponent;
}