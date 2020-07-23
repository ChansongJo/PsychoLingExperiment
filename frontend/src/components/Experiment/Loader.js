import React, {useState, useEffect} from "react";
import {useParams, useHistory} from 'react-router-dom';
import InitExperiment from "./Procedures";
import {Clock} from "./utils";
import {ExperimentContext} from "../../models/ExperimentContext"
import './Experiment.css';

export default function Experiment() {
    const {id, mode} = useParams();
    const [pointer, setPointer] = useState(0);
    const [trialDone, setTrialDone] = useState(false);
    const sentenceList = [
        "철수는 어제 학교에 갔다가 그냥 돌아왔다",
        "영희는 그런 철수가 한심하게 느껴졌다",
        "오늘 서울의 날씨는 비가 올 예정임"
    ];
    const stimulusSet = sentenceList.map((item, idx) => {
        return {
            sentence: item,
            isGrammatical: true,
            isFiller: true,
            id: idx,
        };
    });
    const [context, setContext] = useState(null);

    // BE 통신 부로 변경 예정
    // FOR DEBUG
    const getNewContext = () => {
        const _context = new ExperimentContext({stimulus: stimulusSet[pointer], trialLength: 3, trialNumber: pointer + 1});
        setPointer(pointer + 1);
        if (_context !== undefined) {
            setContext(_context);
        }
    };

    useEffect(
        () => {
            getNewContext();
            setTrialDone(false);
        }, [trialDone]
    );

    return (
        <>
            <div className='experiment-header'>
                <div className="status" >
                    <Clock />
                    <span>{mode}</span>
                    <span> session-id : {id}</span>
                </div>
            </div >
            <div className='experiment-body'>
                {context !== null && <InitExperiment context={context} setTrialDone={setTrialDone} />}
            </div>
        </>
    );
}