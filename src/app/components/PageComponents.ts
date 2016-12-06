import {Component, Optional, SkipSelf, Inject} from "@angular/core";
import {RouteParams} from '@angular/router';
import metadata from "liberry";
import BaseLibraryComponent from 'app/classes/BaseLibraryComponent';
import {LibraryContext} from "app/providers/LibraryContext";
import _ from "lodash";
import {objectPath} from "app/utilities/objectPath";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {Parent, LibraryMetadata} from '../constants/DependencyTokens';
import provideAsParent from 'app/providers/provideAsParent';

export var PageComponentRoutes = [];
var site : any = metadata.site;

for (var i in site.pages.routes) {
    if (site.pages[i].html) {
        var page = site.pages[i];

        @Component({
            selector: `${i}-page`,
            template: page.html,
            providers: [provideAsParent(PageComponent)]
        })
        class PageComponent extends BaseLibraryComponent {
            constructor(
                public routeParams: RouteParams,
                @SkipSelf() public parent: Parent,
                public libraryMetadata: LibraryMetadata
            ) {
                this.url = routeParams.params;
                this.library = libraryMetadata.library;
            };

            public url;
            public library;
            public contextDef;
            public observableContext = new BehaviorSubject<Object>(undefined);
            public id = `${page.name}Page`;

            ngOnInit() {
                //console.log(`init: ${i}Page`)
                var cmp = this;
                this.parent.observableContext.subscribe((context) => {
                    console.log(`next: ${i}Page`)
                    cmp.context = !cmp.contextDef ? (context || cmp.library) : objectPath.get(cmp.library, cmp.contextDef);
                    _.extend(cmp, cmp.context);
                    cmp.observableContext.next(cmp.context);
                });
            }
        }

        var componentName = `${i}Page`;

        Object.defineProperty(PageComponent, "name", {
            value: componentName
        });

        var RouteConfig = {
            path: site.pages[i].path.slice(6, Infinity),
            name: site.pages[i].title,
            component: PageComponent,
            useAsDefault: false
        };

        var routes = site.pages.routes;
        if (typeof(routes) === "object") {
            //set custom route
            if (routes.hasOwnProperty(i)) {
                RouteConfig.path = routes[i];
            }
            //determine if this should be the default route
            if (site.pages.hasOwnProperty("default") 
                && routes.hasOwnProperty(site.pages.default)
                && site.pages.default === i)  {
                RouteConfig.useAsDefault = true;
            }
            else if (i.toLowerCase() === "index") {
                RouteConfig.useAsDefault = true;
            }
        }
        else if (i.toLowerCase() === "index") {
            RouteConfig.useAsDefault = true;
        }
    }
    
    PageComponentRoutes.push(RouteConfig);
};