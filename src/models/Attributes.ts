
export class Attributes<T extends object> {
    constructor(private data: T) { }
    getAll = (): T => {
        return this.data;
    }
	get = <K extends keyof T>(propName: K): T[K] => {
		return this.data[propName];
	}
	set = (update: T): void => {
		Object.assign(this.data, update);
	}
}