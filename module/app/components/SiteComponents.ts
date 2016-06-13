import {Component, provide, Inject, Input, Injector, ViewRef, QueryList, HostListener} from 'angular2/core';
import {metadata} from 'app/resources/metadata';
import {RepeaterManager} from "app/components/RepeaterManager";
import {RouteParams} from 'angular2/router';
import {LibraryContext} from "app/providers/LibraryContext";
import createPrototypeChain from "app/utilities/createPrototypeChain";
import {objectPath} from "app/utilities/objectPath";

export var SiteComponents = [];
var site : any = metadata.site;

for (var name in site.components) {
    if (site.components[name].html) {
        var component = site.components[name];

        @Component({
            selector: `${component.selector}, ${name}-component`,
            template: component.html,
            directives: [RepeaterManager],
            providers: [LibraryContext]
        })
        class SiteComponent {
            constructor(
                _routeParams: RouteParams,
                @Inject("LibraryContext") public context: any,
                @Inject("LibraryMetadata") public libraryMetadata: any
            ) {
                this.url = _routeParams.params;
                this.context = context;
                this.library = libraryMetadata.library;
                createPrototypeChain(this, this.context, this.url);
            }

            @Input()
            public context;
            public url;

            ngOnInit() {
                if(typeof(this.context) === "string") {
                    this.context = objectPath.get(this.library, this.context);
                    createPrototypeChain(this, this.context, this.url);
                }
            }
        }

        var componentName = `${name}Component`;

        Object.defineProperty(SiteComponent, "name", {
            value: componentName
        });

        SiteComponents.push(SiteComponent);
    }
}