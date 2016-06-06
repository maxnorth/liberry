import { Component } from 'angular2/core';
import { TemplateUrls, PatternLibrary } from 'app/resources/resource';
import {RepeaterComponents} from "app/components/RepeaterComponents";
import {RepeaterManager} from "app/components/RepeaterManager";
import {RouteConfig, ROUTER_DIRECTIVES} from "angular2/router";
import {PageComponentRoutes} from "app/components/PageComponents";

@Component({
    selector: 'pattern-library',
    templateUrl: TemplateUrls.PatternLibrary
})
@RouteConfig(PageComponentRoutes)
export default class RootComponent {
    constructor() {
    };
}

