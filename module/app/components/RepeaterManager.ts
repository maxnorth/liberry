import {Directive, Input, TemplateRef, ViewContainerRef, ComponentResolver, HostListener, ChangeDetectorRef} from "angular2/core";
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
    @Input() on;

    ngOnChanges(changes) {

        //console.log(this.on);
        if (changes.on) {
            this.viewContainerRef.clear();
            this.setView();
        }
    }

    ngOnInit() {
    }

    setView() {
        var repeater = this.repeater;
        var on = this.on;
        if (repeater && site.repeaters[repeater]) {
            var component = site.repeaters._components[`${repeater}Repeater`];
            this.componentResolver.resolveComponent(component).then((componentFactory) => {

                var path = typeof(on) === "string" ? on : (on && on.path || "");
                var root = objectPath.get(library, path);
                var children = root.items;
                //iterate through library items and add them to the viewContainer
                for (var child in children) {
                    child = children[child];
                    //debugger;
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
