import {Directive, Input, Host, ViewContainerRef, ComponentResolver, HostListener, ChangeDetectorRef} from "angular2/core";
import {metadata} from "app/resources/metadata";
import {objectPath} from "app/utilities/objectPath";

var site = metadata.site,
    library = metadata.library;

@Directive({
    selector: "[repeater]",
    providers: []
})
export class RepeaterManager {
    constructor(private viewContainerRef: ViewContainerRef, private componentResolver: ComponentResolver, private changeDetectorRef: ChangeDetectorRef ) {
    }

    @Input() repeater;
    @Input() context;

    ngOnChanges(changes) {

        if (changes.context) {
            this.viewContainerRef.clear();
            this.setView();
        }
    }

    setView() {
        var repeater = this.repeater;
        var context = this.context;
        if (repeater && site.repeaters[repeater]) {
            var component = site.repeaters._components[`${repeater}Repeater`];
            this.componentResolver.resolveComponent(component).then((componentFactory) => {

                var path = typeof(context) === "string" ? context : (context && context.path || "");
                var root = objectPath.get(library, path);
                var children = root.items;
                //iterate through library items and add them to the viewContainer
                for (var child in children) {
                    child = children[child];
                    var componentRef = this.viewContainerRef.createComponent(componentFactory);
                    var component = componentRef.instance;

                    for (var prop in child) {
                        component[prop] = child[prop];
                    }
                }
            });
        }
    }
}
