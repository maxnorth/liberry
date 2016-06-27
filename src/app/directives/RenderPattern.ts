import { Directive, ElementRef, Injector } from 'angular2/core';
import {Parent} from '../constants/DependencyTokens';

@Directive({
    selector: "render-pattern, [render-pattern]"
})
export class RenderPattern {
    //better practice for doing this without touching nativeElement?
    constructor(elementRef: ElementRef, parent: Parent, injector: Injector) {
        parent.observableContext.subscribe(context => {
            if (context) elementRef.nativeElement.innerHTML = context.html || "";//this.renderPreview(context);
        });
    }

//    private renderPattern(context) {
//         if (context) {
//             if (context.html) {
//                 return Prism.highlight(context.html, Prism.languages.html);
//             }
//             return `[No Html available for ${context.title}]`;
//         }
//         return "";
//    }
}