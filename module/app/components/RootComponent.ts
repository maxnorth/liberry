import { Component } from 'angular2/core';
import { TemplateUrls, PatternLibrary } from '../resources/resource';
import {RepeaterComponents} from "RepeaterComponents";
import {RepeaterManager} from "RepeaterManager";
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

