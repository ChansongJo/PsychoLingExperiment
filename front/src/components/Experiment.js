import React, {useState, useEffect} from "react";
import {useParams, useHistory} from 'react-router-dom';
import InitExperiment from "./ExpProcedures";
import {Clock} from "./utils"
import './Experiment.css';

export default function Experiment() {
    const {id} = useParams();
    const [pointer, setPointer] = useState(0);
    const [allDone, setAllDone] = useState(false);
    const sentenceList = [
        "철수는 어제 학교에 갔다가 그냥 돌아왔다",
        "영희는 그런 철수가 한심하게 느껴졌다",
        "오늘 서울의 날씨는 비가 올 예정임"
    ];
    const stimulusSet = sentenceList.map(item => {
        return {
            sentence: item.split(' '),
            isGrammatical: true,
            isFiller: true
        }
    })
    const [stimulus, setStimulus] = useState([]);

    // BE 통신 부로 변경 예정
    // FOR DEBUG
    const getNewSentence = () => {
        const stimulus = stimulusSet[pointer];
        setPointer(pointer + 1);
        if (stimulus !== undefined) {
            setStimulus(stimulus);
        } else {
            setStimulus({isExperimentEnd: true})
        }
    };

    useEffect(
        () => {
            getNewSentence();
            setAllDone(false);
        }, [allDone]
    );

    return (
        <>
            <header>
                <div className="status" >
                    <Clock />
                    <span>Test Trial</span>
                    <span> session-id : {id}</span>
                </div>
            </header >
            <body>
                <InitExperiment stimulus={stimulus} setAllDone={setAllDone} />
            </body>
        </>
    );
}