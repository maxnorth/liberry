import {Component, Optional, SkipSelf, Inject} from "angular2/core";
import {RouteParams} from 'angular2/router';
import {metadata} from "app/resources/metadata";
import BaseLibraryComponent from 'app/classes/BaseLibraryComponent';
import {LibraryContext} from "app/providers/LibraryContext";
import _ from "lodash";
import {objectPath} from "app/utilities/objectPath";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {Parent, LibraryMetadata} from '../constants/DependencyTokens';
import provideAsParent from 'app/providers/provideAsParent';

export var PageComponentRoutes = [];
var site : any = metadata.site;

for (var i in site.pages) {
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
            path: site.pages[i].path.slice(6, Infinity) + "/:id",
            name: site.pages[i].title,
            component: PageComponent
        };
        var NoArgRouteConfig = {
            path: site.pages[i].path.slice(6, Infinity),
            name: site.pages[i].title,
            component: PageComponent
        };

        if (i === "index") NoArgRouteConfig.useAsDefault = true;

        PageComponentRoutes.push(RouteConfig);
        PageComponentRoutes.push(NoArgRouteConfig);
    };


}
}

