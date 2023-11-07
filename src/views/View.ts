import { Model, HasId } from "../models/Model";

export abstract class View<T extends Model<K>, K extends HasId> {
    regions: {[key:string]: Element} = {}
     constructor(public parent: Element, public model: T) {
        this.bindModel();
    } 
    abstract template(): string;
    eventsMap(): {[key: string]: () => void}  {
        return {}
    }
    regionsMap(): {[key: string]: string }  {
        return {}
    } 



    bindModel(): void {
        this.model.on('change', () => {
            this.render();
        })
    }
    bindEvents(template: DocumentFragment): void {
        const eventsMap = this.eventsMap();
        for (const eventKey in eventsMap) {
            const [eventName, selector] = eventKey.split(':');
            template.querySelectorAll(selector).forEach((element) => {
                element.addEventListener(eventName, eventsMap[eventKey]);
            })
        }
    }
    mapRegions(fragment: DocumentFragment): void {
        const regionsMap = this.regionsMap();
        for(const key in regionsMap) {
            const selector = regionsMap[key];
            const el = fragment.querySelector(selector);
            if (el) {
                this.regions[key] = el;
            }
        }
    }
    onRender():void {

    }
    render(): void {
        this.parent.innerHTML = '';
        const template = document.createElement('template');
        template.innerHTML = this.template();
        this.bindEvents(template.content);
        this.mapRegions(template.content);
        this.onRender();
        this.parent.appendChild(template.content)
    }
}