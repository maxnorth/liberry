import {Directive, Input, Inject, SkipSelf, ViewContainerRef, ComponentResolver } from "@angular/core";
import metadata from "liberry";
import createPrototypeChain from "app/utilities/createPrototypeChain";
import {objectPath} from "app/utilities/objectPath";
import _ from "lodash";
import BaseLibraryComponent from 'app/classes/BaseLibraryComponent';
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {Parent, LibraryMetadata} from '../constants/DependencyTokens';
import provideAsParent from 'app/providers/provideAsParent';

var site = metadata.site,
    library = metadata.library;

@Directive({
    selector: "[repeater]",
    providers: []
})
export class RepeaterManager extends BaseLibraryComponent {
    constructor(
        private viewContainerRef: ViewContainerRef,
        private componentResolver: ComponentResolver,
        @SkipSelf() public parent: Parent,
        public libraryMetadata: LibraryMetadata
    ) {
        this.library = libraryMetadata.library;
    }

    @Input() public repeater;
    @Input("context") public contextDef;
    @Input() public filter = "";
    public url;
    public library;
    public observableContext = new BehaviorSubject<Object>(undefined);
    public id = "uninitialized repeaterManager"
    
    ngOnInit() {
        this.id = this.repeater;
        //console.log(`init: ${this.repeater} repeaterManager`, `parent: ${this.parent.id}`, this.parent);
        var cmp = this;
        this.parent.observableContext.subscribe((context) => {
            cmp.context = !cmp.contextDef ? (context || cmp.library) : objectPath.get(cmp.library, cmp.contextDef);
            cmp.setView()
            cmp.observableContext.next(cmp.context);
            console.log(`next: ${this.repeater} repeaterManager`, `parent: ${this.parent.id}`, cmp.context);
        });
    }

    setView() {
        this.viewContainerRef.clear();
        var repeater = this.repeater;
        var context = this.context;
        if (repeater && site.repeaters[repeater]) {
            var component = site._components[`${repeater}Repeater`];
            this.componentResolver.resolveComponent(component).then((componentFactory) => {
                var items = context.items || this.libraryMetadata.library.items;
                //iterate through library items and add them to the viewContainer
                items = filterItems(items, this.filter);
                for (var i in items) {
                    var item = items[i];
                    var componentRef = this.viewContainerRef.createComponent(componentFactory);
                    var component = componentRef.instance;
                    component.context = item;
                    // for (var i in component.context) {
                    //     component[i] = component.context[i];
                    // }
                    //createPrototypeChain(
                    _.extend(component, component.context);
                }
            });
        }
    }
}

function filterItems(items, filter) {
        //separate by a space delimiter
        var filters = filter.split(" ").filter(x => !!x);

        if (items && filters.length > 0) {
            var filteredItems = filterPoly(items, x => {
                for (var key in filters){
                    if (typeof(x) === "object" && x.hasOwnProperty(filters[key])) {
                        return true;
                    }
                }
                return false;
            });
            return filteredItems;
        }
        return items;

        function filterPoly(items, condition) {
            if (typeof(items) === "object" && items.hasOwnProperty("length")) {
                return items.filter(items, condition);
            }

            var filteredItems = [];
            for (let key in items) {
                let item = items[key];
                if (condition(item)) {
                    filteredItems.push(item);
                }
            }
            return filteredItems;
        }
    }