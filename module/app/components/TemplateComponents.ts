import {Component, Input, ViewChildren, QueryList, HostListener} from 'angular2/core';
import {metadata} from 'app/resources/metadata';
import {RepeaterManager} from "app/components/RepeaterManager";

export var TemplateComponents = [];
var site : any = metadata.site;

for (var i in site.templates) {
    if (site.templates[i].html) {
        var template = site.templates[i];

        @Component({
            selector: `[${i}Template], ${i}-template, [templat="${i}"]`,
            template: template.html,
            directives: [RepeaterManager]
        })
        class TemplateComponent {
            constructor() { };
        }

        var componentName = `${i}Template`;

        Object.defineProperty(TemplateComponent, "name", {
            value: componentName
        });

        TemplateComponents.push(TemplateComponent);
    }
}