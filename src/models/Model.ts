import { AxiosPromise, AxiosResponse } from "axios";

interface IModelAttritutes<T> {
    getAll: () => T,
    get<K extends keyof T>(key: K): T[K];
    set(value: T): void;
}
interface ISync<T> {
    fetch(id: number): AxiosPromise;
    save(data: T): AxiosPromise;
}

type Callback = () => void;
interface IEvents {
    on: (eventName: string, callback: Callback) => void;
    trigger: (e:string) => void;
}
export interface HasId {
	id?: number
}

export class Model<T extends HasId> {
    constructor(
        private attributes: IModelAttritutes<T>,
        private sync: ISync<T>,
        private events: IEvents
    ) {

    }
    get on() {
		return this.events.on;
	}
	get trigger() {
		return this.events.trigger
	}
	get get() {
		return this.attributes.get;
	}

	set(update: T): void {
		this.attributes.set(update);
		this.events.trigger('change');
	}

	fetch(): void {
		const id = this.get('id');
		if (typeof id !== 'number') {
			throw new Error('Cannot fetch without an id');		
		}

		this.sync.fetch(id).then((responce: AxiosResponse):void => {
			this.set(responce.data);
		})
	}
	save(): void {
		this.sync.save(this.attributes.getAll()).then(() => {
			this.events.trigger('save');
		}).catch(() => {
			this.events.trigger('error');

		})
		
	}
}