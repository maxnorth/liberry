import {Directive, Input, Host, ViewContainerRef, ComponentResolver, HostListener, ChangeDetectorRef} from "angular2/core";
import {metadata} from "app/resources/metadata";
import {objectPath} from "app/utilities/objectPath";

var site = metadata.site,
    library = metadata.library;

@Directive({
    selector: "[component]",
    providers: []
})
export class SiteComponentManager {
    constructor(private viewContainerRef: ViewContainerRef, private componentResolver: ComponentResolver ) {
    }

    @Input() component;
    @Input() context;

    ngOnChanges(changes) {

        if (changes.context) {
            this.viewContainerRef.clear();
            this.setView();
        }
    }

    setView() {
        if (typeof(this.context) === "string") {

            var component = this.component;
            if (component && site.components[component]) {
                var component = site._components[`${component}Component`];
                this.componentResolver.resolveComponent(component).then((componentFactory) => {

                    this.context = objectPath.get(library, this.context);

                    var componentRef = this.viewContainerRef.createComponent(componentFactory);
                    var component = componentRef.instance;

                    for (var prop in this.context) {
                        component[prop] = this.context[prop];
                        component._context = this.context;
                    }
                });
            }
        }
    }
}
