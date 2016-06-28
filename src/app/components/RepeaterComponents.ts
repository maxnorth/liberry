import {Component, SkipSelf, Input, Host, ViewChildren, Inject, Injector, forwardRef, QueryList, HostListener} from '@angular/core';
import {RouteParams} from '@angular/router';
import {metadata} from 'app/resources/metadata';
import createPrototypeChain from "app/utilities/createPrototypeChain";
import componentBuilder from 'app/utilities/componentBuilder';
import {objectPath} from "app/utilities/objectPath";
import {LibraryMetadata, Parent} from 'app/constants/DependencyTokens';
import provideAsParent from 'app/providers/provideAsParent';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import _ from "lodash";

export var RepeaterComponents = componentBuilder(metadata.site.repeaters, "Repeater", (repeater) => {
  @Component({
    selector: `[${repeater.name}-repeater]`,
    template: repeater.html,
    providers: [provideAsParent(RepeaterComponent)]
  })
  class RepeaterComponent {
    constructor(
        private _routeParams: RouteParams,
        public libraryMetadata: LibraryMetadata,
        @SkipSelf() public parent: Parent
    ) {
      this.url = _routeParams.params;
      this.library = libraryMetadata.library;
    };

    public context;
    public url;
    public library;
    public observableContext = new BehaviorSubject<Object>(undefined);
    public id = `${repeater.name}Repeater`

    ngOnInit() {
      //console.log(`init: ${component.name}Component`, `parent: ${this.parent.id}`, this.parent);

      var cmp = this;
      this.parent.observableContext.subscribe((context) => {
        //debugger;
        cmp.observableContext.next(cmp.context);
      });
    }
  }
  return RepeaterComponent;
});