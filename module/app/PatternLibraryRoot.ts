import { Component } from 'angular2/core';
import { TemplateUrls, PatternLibrary } from 'app/resources/resource';
import {RepeaterComponents} from "app/components/RepeaterComponents";
import {RepeaterManager} from "app/components/RepeaterManager";

@Component({
    selector: 'pattern-library',
    templateUrl: TemplateUrls.PatternLibrary,
    directives: [RepeaterManager].concat(RepeaterComponents)
    //pipes: AllPipes
})
export default class RootComponent {
    constructor() {
        this.hey = "llll";
    };
}

