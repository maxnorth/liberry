import {Component, provide, SkipSelf, Optional, Inject, Input, forwardRef} from 'angular2/core';
import {metadata} from 'app/resources/metadata';
import {RepeaterManager} from "app/components/RepeaterManager";
import {RouteParams} from 'angular2/router';
import {LibraryContext} from "app/providers/LibraryContext";
import createPrototypeChain from "app/utilities/createPrototypeChain";
import {objectPath} from "app/utilities/objectPath";
import componentBuilder from 'app/utilities/componentBuilder';
import _ from "lodash";
import BaseLibraryComponent from "app/classes/BaseLibraryComponent";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {Parent, LibraryMetadata} from '../constants/DependencyTokens';
import provideAsParent from 'app/providers/provideAsParent';

export var SiteComponents = componentBuilder(metadata.site.components, "Component", (component) => {
    @Component({
        selector: `${component.selector}, ${component.name}-component`,
        template: component.html,
        directives: [RepeaterManager],
        providers: [LibraryContext, provideAsParent(SiteComponent)]
    })
    class SiteComponent extends BaseLibraryComponent{
        constructor(
            private _routeParams: RouteParams,
            @SkipSelf() private parent: Parent,
            public _libraryMetadata: LibraryMetadata
        ) {
            this.url = _routeParams.params;
            this.library = _libraryMetadata.library;
        }

        @Input("context") public contextDef;
        public url;
        public library;
        public observableContext = new BehaviorSubject<Object>(undefined);
        public id = `${component.name}Component`;

        ngOnInit() {
            //console.log(`init: ${component.name}Component`, `parent: ${this.parent.id}`, this.parent);

            var cmp = this;
            this.parent.observableContext.subscribe((context) => {
                cmp.context = !cmp.contextDef ? (context || cmp.library) : objectPath.get(cmp.library, cmp.contextDef);
                _.extend(cmp, cmp.context);
                cmp.observableContext.next(cmp.context);

                console.log(`next: ${component.name}Component`, `parent: ${this.parent.id}`, cmp.context);
            });
        }
    }
    return SiteComponent;
});