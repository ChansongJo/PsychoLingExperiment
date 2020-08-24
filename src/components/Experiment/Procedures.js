import React, {useState, useEffect, useRef} from "react";
import useEventListener from "@use-it/event-listener";
import "./Experiment.css";
import CorsiTest from "../CorsiTest";

// https://github.com/donavon/use-event-listener

const PROGRESS_KEY = [" "];
const CHOICE_KEY = ["ArrowRight", "ArrowLeft"];


const ExperimentHandler = (props) => {
    const [ready, setReady] = useState(false);
    const isExperimentEnd = props.context.isExperimentEnd

    useEffect(
        () => {
            if (!isExperimentEnd) {
                const timer1 = setTimeout(() => setReady(true), 1500);
                return () => clearTimeout(timer1);
            }
        }
        , [props]
    );

    useEffect(
        () => {
            setReady(false);
        }, [props]
    );
    return (
        <>
            {!isExperimentEnd
                ?
                !ready ? <crosshair>+</crosshair>
                    : <Reading {...props} />
                :
                <CorsiTest {...props} />}
        </>
    );
};


const Reading = (props) => {
    const context = props.context

    const {sentence} = context.stimulus_data;
    const maskedSentence = sentence.map(item => "__".repeat(item.length));
    const [renderedSentence, setRenderedSentence] = useState(maskedSentence);
    const [pointer, setPointer] = useState(0);
    const [done, setDone] = useState(false);
    const [pressed, setPressed] = useState(false)


    const spacebarHandler = ({key, timeStamp}) => {
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
    useEventListener("keyup", () => {setPressed(false)});

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

    const keyPressHandler = ({key, timeStamp}) => {
        if (answer === null && CHOICE_KEY.includes(String(key))) {
            context.judgementEndTimeStamp = timeStamp
            setAnswer(String(key) === 'ArrowLeft' ? true : false)
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
                <div className="comment bold">제시되었던 문장의 자연스러움을 평가해 주세요.</div>
                <div className="comment">문장이 자연스러웠다면 O, 자연스럽지 않았다면 X를 <br /> 키보드의 방향키를 이용해 선택해 주세요.</div>
                <div className="comment">선택을 완료한 후에는 Space Bar를 눌러 다음으로 진행하세요.</div>
            </div>
            <div className="choiceSet">
                <div className="choiceBox" style={{backgroundColor: keyResponse === 'ArrowLeft' ? 'chartreuse' : null}}>
                    <div className='choice'>
                        O
                            </div>
                    <div className="keyPress symbol">←</div>
                    <div className="keyPress">왼쪽 화살표 키를 눌러 선택하세요</div>
                </div>
                <div className="choiceBox" style={{backgroundColor: keyResponse === 'ArrowRight' ? 'tomato' : null}}>
                    <div className='choice'>
                        X
                            </div>
                    <div className="keyPress symbol">→</div>
                    <div className="keyPress">오른쪽 화살표 키를 눌러 선택하세요</div>
                </div>
            </div>
        </>
    );
};


export default ExperimentHandler;




