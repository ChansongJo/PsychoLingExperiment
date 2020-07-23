import {Model} from "./Model";

export class Stimulus extends Model {
    constructor(data) {
        super(data);
    }

    get sentence() {
        return this.getFromPath('sentence').split(" ");
    }

    get isGrammatical() {
        return this.getFromPath('isGrammatical');
    }

    get isFiller() {
        return this.getFromPath('isFiller');
    }

    get id() {
        return this.getFromPath('id');
    }
}


export class ExperimentContext extends Model {

    constructor(data) {
        super(data);
        this.stimulus = new Stimulus(this.getFromPath('stimulus'));
    }

    get sessionId() {
        return this.getFromPath('sessionId');
    }

    get reactionTime() {
        return this.getFromPath('reationTime');
    }

    get isCorrect() {
        return this.getFromPath('isCorrect');
    }

    get judgementTestRT() {
        return this.getFromPath('judgementTestRT');
    }

    get trialNumber() {
        return this.getFromPath('trialNumber');
    }

    set reactionTime(v) {
        if (v.length + 1 !== this.stimulus.sentence.length) {
            throw ('The length of RT array is inCorrect!!!');
        } else {
            this.__obj['reactionTimeAbsolute'] = v;
            const initial = v[0];
            this.__obj['reactionTime'] = v.map(item => item - initial);
        }
    }

    set isCorrect(subjectAnswer) {
        this.__obj['isCorrect'] = subjectAnswer === this.stimulus.isGrammatical;
    }

    setJudgementTestRT(start, end) {
        this.__obj['judgementTestRT'] = end - start;
    }

}