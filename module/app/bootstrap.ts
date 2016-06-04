import 'zone.js';
import 'reflect-metadata';
import {provide, PLATFORM_DIRECTIVES} from "angular2/core";
import {bootstrap} from 'angular2/platform/browser';
import RootComponent from 'app/PatternLibraryRoot';
import {RepeaterComponents} from "app/components/RepeaterComponents";
import {RepeaterManager} from "app/components/RepeaterManager";
import {TemplateComponents} from "app/components/TemplateComponents";
import {ROUTER_PROVIDERS,ROUTER_DIRECTIVES} from "angular2/router";

 var PlatformDirectives = [ROUTER_PROVIDERS],
     GlobalDirectives = [RepeaterManager, RepeaterComponents, TemplateComponents, ROUTER_DIRECTIVES];

for (var i in GlobalDirectives) {
    var directive = GlobalDirectives[i];
    PlatformDirectives.push(provide(PLATFORM_DIRECTIVES, {useValue: directive, multi: true}));
}

bootstrap(RootComponent, PlatformDirectives);