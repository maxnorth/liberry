import {BehaviorSubject} from "rxjs/BehaviorSubject";

export default class BaseLibraryComponent {
    //context is prototype
    public observableContext = new BehaviorSubject<Object>(undefined);
    
    public setContext(context, setSuperContext?){
        if (setSuperContext) {
            this.context = context;
        }
        //apply context fields to this
        //this.__proto__ = context;
        this.observableContext.next(context);
    }
    
    public watchContext(self) {
        self.parentObservableContext.subscribe((parentContext) => {
            if (!self.contextDef) {
                this.setContext(parentContext, true);
            }
        });
    }
    private _parentContext
    public context;
}