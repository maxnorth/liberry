import {Component} from "angular2/core";
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
            constructor() { };
        }

        var componentName = `${i}Page`;

        Object.defineProperty(PageComponent, "name", {
            value: componentName
        });

        var RouteConfig = {
            path: site.pages[i].path.slice(6, Infinity),
            name: site.pages[i].title,
            component: PageComponent
        };

        if (i === "index") RouteConfig.useAsDefault = true;

        PageComponentRoutes.push(RouteConfig);
    }
}

