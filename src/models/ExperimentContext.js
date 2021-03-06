import {Model} from "./Model";

export class Stimulus extends Model {
    constructor(data) {
        super(data);
    }

    get sentence() {
        return this.getFromPath('sentence').split(" ");
    }

    get isGrammatical() {
        return this.getFromPath('is_grammatical');
    }

    get id() {
        return this.getFromPath('id');
    }
}


export class ExperimentContext extends Model {

    constructor(data) {
        super(data);
        this.stimulus_data = new Stimulus(this.getFromPath('stimulus_data'), {});
        this.rawRT = []
    }

    get sessionId() {
        return this.getFromPath('session_id');
    }

    get group() {
        return this.getFromPath('group');
    }

    get reactionTime() {
        return this.getFromPath('reaction_time');
    }

    get isCorrect() {
        return this.getFromPath('judgement_result');
    }

    get judgementTestRT() {
        return this.getFromPath('judgement_reaction_time');
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

    get order() {
       return this.__obj['order']
    }

    get judgementEndTimeStamp() {
        return this.__obj['judgementEndTimeStamp']
    }

    validateReactionTime() {
        const rawRT = this.rawRT
        if (rawRT.length !== this.stimulus_data.sentence.length + 1) {
            console.log(rawRT)
            throw ('The length of RT array is inCorrect!!!', this.stimulus_data.sentence);
        } else {
            this.__obj['reaction_time_absolute'] = rawRT;
            const initial = rawRT[0];
            this.__obj['reaction_time'] = rawRT.map(item => item - initial);
        }
    }

    setJudgementTestResult(subjectAnswer) {
        this.__obj['judgement_result'] = subjectAnswer === this.stimulus_data.isGrammatical;
        this.__obj['judgement_reaction_time'] = this.judgementEndTimeStamp - this.rawRT[this.rawRT.length - 1];
    }

}