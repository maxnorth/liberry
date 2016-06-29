import { Directive, ElementRef, Injector } from '@angular/core';
import Prism from 'prismjs';
import {Parent} from '../constants/DependencyTokens';

@Directive({
    selector: "preview-html, [preview-html]"
})
export class PreviewHtml {
    //better practice for doing this without touching nativeElement?
    constructor(elementRef: ElementRef, parent: Parent, injector: Injector) {
        parent.observableContext.subscribe(context => {
            elementRef.nativeElement.innerHTML = this.renderPreview(context);
        });
    }

   private renderPreview(context) {
        if (context) {
            if (context.html) {
                return Prism.highlight(context.html, Prism.languages.html, true);
            }
            return `[No Html available for ${context.title}]`;
        }
        return "";
   }
}