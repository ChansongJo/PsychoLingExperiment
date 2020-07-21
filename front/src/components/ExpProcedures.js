import React, {useState, useEffect, useRef} from "react";
import useEventListener from "@use-it/event-listener";
import "./Experiment.css";

// https://github.com/donavon/use-event-listener

const PROGRESS_KEY = [" "];


const InitExperiment = (props) => {
    const [done, setDone] = useState(false);

    useEffect(
        () => {
            console.log(props.stimulus.isExperimentEnd)
            if (!props.stimulus.isExperimentEnd) {
                console.log('start timer');
                const timer1 = setTimeout(() => setDone(true), 1500);
                return () => clearTimeout(timer1);
            }
        }
        , [props]
    );

    useEffect(
        () => {
            setDone(false);
        }, [props]
    );
    return (
        <>
            {!props.stimulus.isExperimentEnd
                ?
                !done ? <crosshair>+</crosshair>
                    : <Reading {...props} />
                :
                <Final {...props} />}
        </>
    );
};


const Reading = (props) => {
    console.log(props)
    const {sentence} = props.stimulus
    const maskedSentence = sentence.map(item => "__".repeat(item.length))
    const [renderedSentence, setRenderedSentence] = useState(maskedSentence);
    const [pointer, setPointer] = useState(0);
    const [done, setDone] = useState(false);

    const spacebarHandler = event => {
        const key = event.key;
        console.log(key, pointer);
        console.log(event.timeStamp);

        if (PROGRESS_KEY.includes(String(key)) && !done) {
            console.log(sentence);
            if (pointer < sentence.length) {
                let _temp = [...maskedSentence];
                _temp[pointer] = sentence[pointer];
                setRenderedSentence(_temp);
                setPointer(pointer + 1);
            } else {
                setDone(true);
            }
        }
    };

    useEventListener("keydown", spacebarHandler);

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

const Final = (props) => {
    return (
        <div>FINISHED</div>
    );
};

const JudgementTest = (props) => {
    const [isCorrect, setIsCorrect] = useState(null)
    const [answer, setAnswer] = useState(null)
    const setDone = props.setAllDone;

    const keyPressHandler = ({key}) => {
        console.log(key)
        console.log(props)
        if (isCorrect === null) {
            const raw_answer = String(key) === 'ArrowLeft' ? true : false
            setAnswer(String(key))
            if (raw_answer === props.stimulus.isGrammatical) {
                setIsCorrect(true)
            } else {
                setIsCorrect(false)
            }
        } else if (PROGRESS_KEY.includes(String(key))) {
            setDone(true)
        }
    }

    useEventListener("keydown", keyPressHandler);
    const ShowCorrect = () => {
        return (
            <>
                <div style={{marginTop: "40px"}}> {isCorrect ? "정답입니다." : "오답입니다."}</div>
                <div style={{marginTop: "20px"}}> Space Bar 를 눌러 다음 문장으로 진행하세요.</div>
            </>
        )
    }

    return (
        <>
            <div className="instruction">
                <div className="comment bold">제시 되었던 문장의 자연스러움을 평가해 주세요.</div>
                <div className="comment">키보드로 보기 O / X 를 선택하고 Space Bar를 눌러 다음으로 진행하세요.</div>
            </div>
            <div className="choiceSet">
                <div className="choiceBox" style={{backgroundColor: answer === 'ArrowLeft' ? 'chartreuse' : null}}>
                    <div className='choice'>
                        O
                            </div>
                    <div className="keyPress" style={{
                        fontSize: 'x-large',
                        fontWeight: 'bold'
                    }}>←</div>
                    <div className="keyPress">왼쪽 화살표 키를 눌러 선택하세요</div>
                </div>
                <div className="choiceBox" style={{backgroundColor: answer === 'ArrowRight' ? 'tomato' : null}}>
                    <div className='choice'>
                        X
                            </div>
                    <div className="keyPress" style={{fontSize: 'x-large', fontWeight: 'bold'}}>→</div>
                    <div className="keyPress">오른쪽 화살표 키를 눌러 선택하세요</div>
                </div>
            </div>
            {isCorrect !== null && <ShowCorrect />}

        </>
    )
}

export default InitExperiment



