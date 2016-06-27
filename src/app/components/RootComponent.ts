import { Component } from 'angular2/core';
import { TemplateUrls, PatternLibrary } from '../resources/resource';
import {RepeaterComponents} from "RepeaterComponents";
import {RepeaterManager} from "RepeaterManager";
import {RouteConfig, ROUTER_DIRECTIVES} from "angular2/router";
import {PageComponentRoutes} from "app/components/PageComponents";
import provideAsParent from 'app/providers/provideAsParent';
import {LibraryMetadata} from 'app/constants/DependencyTokens';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';


@Component({
    selector: 'pattern-library',
    template: `<router-outlet></router-outlet>`,
    providers: [provideAsParent(RootComponent)]
})
@RouteConfig(PageComponentRoutes)
export default class RootComponent {
    constructor(public libraryMetadata: LibraryMetadata) {
        this.observableContext = new BehaviorSubject(libraryMetadata.library);
    }; 
}

