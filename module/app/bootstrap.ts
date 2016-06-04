import 'zone.js';
import 'reflect-metadata';
import {provide, PLATFORM_DIRECTIVES} from "angular2/core";
import {bootstrap} from 'angular2/platform/browser';
import RootComponent from 'app/PatternLibraryRoot';
import {RepeaterComponents} from "app/components/RepeaterComponents";
import {RepeaterManager} from "app/components/RepeaterManager";
import {TemplateComponents} from "app/components/TemplateComponents";

 var PlatformDirectives = [],
     GlobalDirectives = [RepeaterManager].concat(RepeaterComponents).concat(TemplateComponents);

for (var i in GlobalDirectives) {
    var directive = GlobalDirectives[i];
    PlatformDirectives.push(provide(PLATFORM_DIRECTIVES, {useValue: directive, multi: true}));
}

bootstrap(RootComponent, PlatformDirectives);