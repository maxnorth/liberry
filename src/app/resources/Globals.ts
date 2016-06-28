import {RepeaterComponents} from "app/components/RepeaterComponents";
import {RepeaterManager} from "app/components/RepeaterManager";
import {SiteComponents} from "../components/SiteComponents";
import {ROUTER_DIRECTIVES, ROUTER_PROVIDERS} from "@angular/router";
//import {ParentComponent} from "app/components/TestParentComponent";
import {HrefRouter} from 'app/directives/HrefRouter';
import {PreviewHtml} from 'app/directives/PreviewHtml';
import {RenderPattern} from 'app/directives/RenderPattern';
import {PathPipe} from 'app/pipes/Path'

export var GlobalDirectives = [
    RepeaterManager,
    RepeaterComponents,
    SiteComponents,
    ROUTER_DIRECTIVES,
    HrefRouter,
    PreviewHtml,
    RenderPattern
];

export var GlobalProviders = [
    ROUTER_PROVIDERS
];

export var GlobalPipes = [
    PathPipe
]