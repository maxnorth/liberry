import {provide, Injector} from 'angular2/core';
import {objectPath} from "app/utilities/objectPath";

export var LibraryContext = provide("LibraryContext", {
    useFactory: parseLibraryContext,
    deps: [Injector, "LibraryMetadata"]
});

function parseLibraryContext(_injector, libraryMetadata) {
    var context =_injector._view.parent.context.libraryMetaDataContext;
    if (!context) return libraryMetadata;
    if (typeof(context) === "object") return context;
    if (typeof(context) === "string") {
        objectPath.get(context, libraryMetadata);
    }
    else throw new Error("Invalid Library Metadata Context type.");
}