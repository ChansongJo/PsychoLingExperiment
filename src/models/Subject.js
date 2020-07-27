import {Model} from "./Model";

const getAge = birthDate => Math.floor((new Date() - new Date(birthDate).getTime()) / 3.15576e+10)


export class SubjectModel extends Model {
    constructor(data) {
        super(data);
    }

    get payload() {
        return {
            ...this.__obj,
            age: getAge(this.getFromPath('birthdate')),
            academic_background: [this.getFromPath('academic_degree'),
            this.getFromPath('academic_status'),
            this.getFromPath('academic_major', '-')].join('_'),

        }
    }


}