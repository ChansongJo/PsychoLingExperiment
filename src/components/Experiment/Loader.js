import React, {useState, useEffect} from "react";
import {useParams, useHistory} from 'react-router-dom';
import InitExperiment from "./Procedures";
import {Clock} from "./utils";
import {ExperimentContext} from "../../models/ExperimentContext"
import * as Api from "../../api"
import './Experiment.css';

function TrialLoop({stimulusSet}) {

    const [trialDone, setTrialDone] = useState(true);

    const [context, setContext] = useState(null);

    // BE 통신 부로 변경 예정
    // FOR DEBUG


    useEffect(
        () => {
            if (trialDone === true) {
                console.log(stimulusSet)
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
    const [stimulusSet, setStimulusSet] = useState(null)
    const [valid, setValid] = useState(false)
    const history = useHistory()
    const sentenceList = [
        "철수는 어제 학교에 갔다가 그냥 돌아왔다",
        "영희는 그런 철수가 한심하게 느껴졌다",
        "오늘 서울의 날씨는 비가 올 예정임"
    ];
    const PracticeStimulusSet = sentenceList.map((item, idx) => {
        return {
            sentence: item,
            is_grammatical: true,
            type: true,
            id: idx,
        };
    }).reverse();

    const fetchStimuli = async () => {
        await Api.getStimuli({id}).then(
            res => {
                console.log(res.data)
                setStimulusSet(res.data.stimuli)
            }
        ).catch(e => console.log(e))
    }
    const validateUser = async (id) => {
        await Api.getUser({id}).then(
            setValid(true)
        ).catch(
            e => {
                console.log(e.response)
                alert('유효하지 않은 session_id입니다. 실험을 진행할 수 없습니다!')
                history.push('/')
            }
        )
    }

    useEffect(
        () => {
            validateUser(id)

            if (mode === 'practice') {
                setStimulusSet(PracticeStimulusSet)
            } else if (valid) {
                fetchStimuli()
                console.log(stimulusSet)
            }
        }, [valid]
    )


    return (
        <>
            <div className='experiment-header'>
                <div className="status" >
                    <span> session-id : {id}</span>
                </div>
            </div >
            {stimulusSet !== null && < TrialLoop stimulusSet={[...stimulusSet]} />}

        </>
    )
}

