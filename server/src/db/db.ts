import { Place } from './../types/place';
export abstract class DB {
    name: string;
    constructor(name: string) {
       this.name = name;
    }
    
    abstract insert(place: Place): Promise<any>;
    abstract remove(id: string): Promise<any>;
    abstract get(id: string): Promise<any>;
    abstract getAll(): any;

    //....etc
  }
  