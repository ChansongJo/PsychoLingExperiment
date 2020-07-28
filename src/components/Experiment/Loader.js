import React, {useState, useEffect} from "react";
import {useParams, useHistory} from 'react-router-dom';
import InitExperiment from "./Procedures";
import {Clock} from "./utils";
import {ExperimentContext} from "../../models/ExperimentContext"
import './Experiment.css';

function TrialLoop({stimulusSet}) {

    const [trialDone, setTrialDone] = useState(true);

    const [context, setContext] = useState(null);

    // BE 통신 부로 변경 예정
    // FOR DEBUG


    useEffect(
        () => {
            if (trialDone === true) {
                const stimulus = stimulusSet.pop()
                let _context
                if (stimulus !== undefined) {
                    _context = new ExperimentContext({stimulus, trialLength: 3, trialNumber: stimulusSet.length});
                } else {
                    _context = new ExperimentContext()
                    _context.isExperimentEnd = true
                }

                console.log('newcon', _context)
                setContext(_context)
                setTrialDone(false);
            }
        }, [trialDone]
    );

    return (
        <div className='experiment-body'>
            {context !== null && <InitExperiment context={context} setTrialDone={setTrialDone} />}
        </div>
    );
}

export default function Experiment() {
    const {id, mode} = useParams();
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

    return (
        <>
            <div className='experiment-header'>
                <div className="status" >
                    <span> session-id : {id}</span>
                </div>
            </div >
            <TrialLoop stimulusSet={stimulusSet} />

        </>
    )
}

