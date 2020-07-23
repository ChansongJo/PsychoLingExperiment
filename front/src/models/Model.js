import {get} from "lodash";


export class Model {
    constructor(obj) {
        this.__obj = obj;
    }

    getFromPath(path, defaultValue = null) {
        return get(this.__obj, path, defaultValue);
    }

    get data() {
        return this.__obj;
    }

    get searchTargets() {
        return JSON.stringify(this.__obj);
    }

}