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
        this.rawRT = []
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

    get trialLength() {
        return this.getFromPath('trialLength')
    }

    get isExperimentEnd() {
        return this.trialLength === this.trialNumber
    }

    set judgementStartTimeStamp(v) {
        this.__obj['judgementStartTimeStamp'] = v
    }

    get judgementStartTimeStamp() {
        return this.__obj['judgementStartTimeStamp']
    }

    set judgementEndTimeStamp(v) {
        this.__obj['judgementEndTimeStamp'] = v
    }

    get judgementEndTimeStamp() {
        return this.__obj['judgementEndTimeStamp']
    }

    validateReactionTime() {
        const rawRT = this.rawRT
        if (rawRT.length !== this.stimulus.sentence.length + 1) {
            console.log(rawRT)
            throw ('The length of RT array is inCorrect!!!', this.stimulus.sentence);
        } else {
            this.__obj['reactionTimeAbsolute'] = rawRT;
            const initial = rawRT[0];
            this.__obj['reactionTime'] = rawRT.map(item => item - initial);
        }
    }

    setJudgementTestResult(subjectAnswer) {
        this.__obj['isCorrect'] = subjectAnswer === this.stimulus.isGrammatical;
        this.__obj['judgementTestRT'] = this.judgementEndTimeStamp - this.rawRT[this.rawRT.length - 1];
    }

}