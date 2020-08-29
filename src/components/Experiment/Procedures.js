import React, { useState, useEffect, useRef } from "react";
import useEventListener from "@use-it/event-listener";
import "./Experiment.css";
import CorsiTest from "../CorsiTest";

// https://github.com/donavon/use-event-listener

const PROGRESS_KEY = [" "];
const CHOICE_KEY = ["ㄹ", "f", "F", "ㅓ", "j", "J"];
const CORRECT_KEY = CHOICE_KEY.slice(0, 3)
const INCORRECT_KEY = CHOICE_KEY.slice(3, 6)
const BREAK_INDEX = 40


const ExperimentHandler = (props) => {
    const [ready, setReady] = useState(false);
    const [breakpoint, setBreakpoint] = useState(false)
    const isExperimentEnd = props.context.isExperimentEnd
    const order = props.context.order

    useEffect(
        () => {
            if (!isExperimentEnd) {
                if (order >= BREAK_INDEX && order % BREAK_INDEX === 0) {
                    setBreakpoint(true)
                }
            }
        }
        , [props]
    );

    useEffect(
        () => {
            if (!isExperimentEnd && !breakpoint) {
                const timer1 = setTimeout(() => setReady(true), 1500);
                return () => clearTimeout(timer1);}
        }, [props, breakpoint]
    )

    useEffect(
        () => {
            setReady(false);
        }, [props]
    );
    return (
        <>
            {!isExperimentEnd
                ? !breakpoint
                    ? !ready 
                        ? <crosshair>+</crosshair>
                        : <Reading {...props} />
                    : <Breakpoint setBreak={setBreakpoint} />
                : <CorsiTest {...props} />}
        </>
    );
};

const Breakpoint = (props) => {
    const setBreak = props.setBreak
    useEventListener("keydown", ({key}) => PROGRESS_KEY.includes(String(key) && setBreak(false)));

    return <div className='instruction'>
            <div className='comment'>지금은 휴식시간입니다.</div>
            <div className='comment'>실험 중이오니, 휴식 시간이 너무 지체되지 않기를 바랍니다.</div>
            <div className='comment'>휴식이 완료되면 SPACE bar를 눌러 다음으로 진행하세요.</div>
            </div>
}


const Reading = (props) => {
    const context = props.context

    const { sentence } = context.stimulus_data;
    const maskedSentence = sentence.map(item => "__".repeat(item.length));
    const [renderedSentence, setRenderedSentence] = useState(maskedSentence);
    const [pointer, setPointer] = useState(0);
    const [done, setDone] = useState(false);
    const [pressed, setPressed] = useState(false)


    const spacebarHandler = ({ key, timeStamp }) => {
        if (!pressed && PROGRESS_KEY.includes(String(key)) && !done) {
            setPressed(true)
            context.rawRT.push(timeStamp)
            if (pointer < sentence.length) {
                let _temp = [...maskedSentence];
                _temp[pointer] = sentence[pointer];
                setRenderedSentence(_temp);
                setPointer(pointer + 1);
            } else {
                context.validateReactionTime()
                setDone(true);
            }
        }
    };

    useEventListener("keydown", spacebarHandler);
    useEventListener("keyup", () => { setPressed(false) });

    useEffect(
        () => {
            setDone(false);
        }, [props]
    );

    return (
        <>
            {!done ? <stimuli>{renderedSentence.join("  ")}</stimuli> : <JudgementTest {...props} />}
        </>
    );
};


const JudgementTest = (props) => {
    const [keyResponse, setKeyResponse] = useState(null);
    const [answer, setAnswer] = useState(null)
    const setDone = props.setTrialDone;

    const context = props.context

    const keyPressHandler = ({ key, timeStamp }) => {
        console.log(key)
        if (answer === null && CHOICE_KEY.includes(String(key))) {
            context.judgementEndTimeStamp = timeStamp
            setAnswer(CORRECT_KEY.includes(String(key)) ? true : false)
            setKeyResponse(String(key));
        } else if (answer !== null && PROGRESS_KEY.includes(String(key))) {
            context.setJudgementTestResult(answer)
            console.log('trialResult', context.__obj)
            setDone(true);
        }
    };

    useEventListener("keydown", keyPressHandler);

    return (
        <>
            <div className="instruction">
                <div className="comment">문장이 자연스러웠다면 키보드의 F키를,  </div>
                <div className="comment">자연스럽지 않았다면 키보드의 J키를 이용해 선택해 주세요.</div>
            </div>
            <div className="choiceSet">
                <div className="choiceBox" style={{backgroundColor: CORRECT_KEY.includes(keyResponse) ? 'chartreuse' : null }}>
                    <div className='choice'>
                        O
                            </div>
                    <div className="keyPress symbol">F</div>
                    <div className="keyPress">f 키를 눌러 선택하세요</div>
                </div>
                <div className="choiceBox" style={{ backgroundColor: INCORRECT_KEY.includes(keyResponse) ? 'tomato' : null }}>
                    <div className='choice'>
                        X
                            </div>
                    <div className="keyPress symbol">J</div>
                    <div className="keyPress">j 키를 눌러 선택하세요</div>
                </div>
                
            </div>
            <div className='instruction'>
                    <div className="comment">선택을 완료한 후에는 Space Bar를 눌러 다음으로 진행하세요.</div>
                </div>
        </>
    );
};


export default ExperimentHandler;




