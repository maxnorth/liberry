import {provide, Injector} from 'angular2/core';
import {objectPath} from "app/utilities/objectPath";
import {BehaviorSubject} from "rxjs/BehaviorSubject";

export var LibraryContext = provide("LibraryContext", {
    useFactory: parseLibraryContext,
    deps: [Injector, "LibraryMetadata"]
});

function parseLibraryContext(_injector, libraryMetadata) {
    var context: BehaviorSubject<Object> = findParentInjectorContext(_injector) || new BehaviorSubject(libraryMetadata.library);
    return context;
}

function findParentInjectorContext(_injector): BehaviorSubject<Object> {
    var parentInjector = _injector && _injector._view && _injector._view.parentInjector;
    if (parentInjector) {
        var parentContext = parentInjector._view && parentInjector._view.context && parentInjector._view.context.observableContext;
        return parentContext || findParentInjectorContext(parentInjector);
    }
}