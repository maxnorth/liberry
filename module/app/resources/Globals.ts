import {RepeaterComponents} from "app/components/RepeaterComponents";
import {RepeaterManager} from "app/components/RepeaterManager";
import {SiteComponents} from "../components/SiteComponents";
import {ROUTER_DIRECTIVES, ROUTER_PROVIDERS} from "angular2/router";
//import {ParentComponent} from "app/components/TestParentComponent";
import {HrefRouter} from 'app/directives/HrefRouter';

export var GlobalDirectives = [
    RepeaterManager,
    RepeaterComponents,
    SiteComponents,
    ROUTER_DIRECTIVES,
    HrefRouter
];

export var GlobalProviders = [
    ROUTER_PROVIDERS
];