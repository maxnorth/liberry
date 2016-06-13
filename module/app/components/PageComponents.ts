import {Component} from "angular2/core";
import {RouteParams} from 'angular2/router';
import {metadata} from "app/resources/metadata";

export var PageComponentRoutes = [];
var site : any = metadata.site;

for (var i in site.pages) {
    if (site.pages[i].html) {
        var page = site.pages[i];

        @Component({
            selector: `${i}-page`,
            template: page.html
        })
        class PageComponent {
            constructor(public routeParams: RouteParams) {
                this.url = routeParams.params;
                //console.log("root", root);
            };
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

