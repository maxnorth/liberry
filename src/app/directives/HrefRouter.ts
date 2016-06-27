import { Directive, ElementRef, Input, SimpleChange, HostListener, HostBinding } from 'angular2/core';
import {Router} from "angular2/router";
import {metadata} from "app/resources/metadata";
//import {$} from "jquery";

var site = metadata.site;

@Directive({
    selector: "a[href]"
})
export class HrefRouter {
    constructor(public elementRef: ElementRef, public router: Router) {
        router.subscribe(o => console.log(o));
    }

    @Input("href") public route;

    @HostListener('click', ['$event'])
    onClick($event) {
        //TODO: make routing more flexible
        $event.preventDefault();
        this.router.navigateByUrl(this.route);
    }

    //set href attribute for the sake of default styling and transparency when examining element
    @HostBinding("attr.href")
    get hrefRoute() { return this.route; }

    ngOnInit() {
        //debugger;
    }
}

function matchRoute(value, routes) {
    for (var i in routes) {
        var route = routes[i];


    }
}