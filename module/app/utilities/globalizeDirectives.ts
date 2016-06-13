import {PLATFORM_DIRECTIVES, provide} from 'angular2/core';

export default function globalizeDirectives(directives) {
    var PlatformDirectives = [];

    for (var i in directives) {
        var directive = directives[i];
        PlatformDirectives.push(provide(PLATFORM_DIRECTIVES, {useValue: directive, multi: true}));
    }
    return PlatformDirectives; 
}