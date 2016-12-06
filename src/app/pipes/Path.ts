import {Pipe} from '@angular/core';
import {objectPath} from "app/utilities/objectPath";
import metadata from "liberry";

@Pipe({
    name: "path"
})
export class PathPipe {
    transform(value) {
        return objectPath.get(metadata, value);
    }
}