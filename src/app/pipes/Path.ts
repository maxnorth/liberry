import {Pipe} from 'angular2/core';
import {objectPath} from "app/utilities/objectPath";
import {metadata} from "app/resources/metadata";

@Pipe({
    name: "path"
})
export class PathPipe {
    transform(value) {
        return objectPath.get(metadata, value);
    }
}