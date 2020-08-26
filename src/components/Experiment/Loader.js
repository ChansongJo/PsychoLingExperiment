import React, {useState, useEffect} from "react";
import {useParams, useHistory} from 'react-router-dom';
import InitExperiment from "./Procedures";
import {ExperimentContext} from "../../models/ExperimentContext"
import * as Api from "../../api"
import './Experiment.css';

function TrialLoop({stimulusSet, id, mode}) {
    const [trialDone, setTrialDone] = useState(true);

    const [context, setContext] = useState(null);
    const [results, setResults] = useState([])
    const [count, setCount] = useState(-1)




    useEffect(
        () => {
            if (trialDone === true) {
                console.log(stimulusSet)
                const stimulus = stimulusSet.stimuli.pop()
                const group = stimulusSet.group

                let _context
                if (stimulus !== undefined) {
                    _context = new ExperimentContext({group, stimulus_data: stimulus, stimulus: stimulus.id, session_id: id, order: count + 1});
                } else {
                    _context = new ExperimentContext({group, session_id: id})
                    _context.isExperimentEnd = true
                }

                console.log('newcon', _context)
                setCount(count + 1)
                context !== null && setResults([...results, context.__obj])
                if (_context.isExperimentEnd) {
                    _context.results = [...results, context.__obj]
                }
                setContext(_context)
                setTrialDone(false);
            }
        }, [trialDone]
    );

    return (
        <div className='experiment-body'>
            {context !== null && <InitExperiment context={context} setTrialDone={setTrialDone} mode={mode} />}
        </div>
    );
}

export default function Experiment({mode = 'real'}) {
    const {id} = useParams();
    const [stimulusSet, setStimulusSet] = useState(null)
    const [valid, setValid] = useState(false)
    const history = useHistory()
    const sentenceList = [
        "철수는 어제 학교에 갔다가 그냥 돌아왔다",
        "영희는 그런 철수가 한심하게 느껴졌다",
        "오늘 서울의 날씨는 비가 올 예정임"
    ];
    const PracticeStimulusSet =
    {
        stimuli: sentenceList.map((item, idx) => {
            return {
                sentence: item,
                is_grammatical: true,
                type: true,
                id: idx,
            };
        }).reverse(),
        group: 'P'
    }

    const fetchStimuli = async () => {
        await Api.getStimuli({id}).then(
            res => {
                console.log(res.data)
                setStimulusSet(res.data)
            }
        ).catch(e => console.log(e))
    }
    const validateUser = async (id) => {
        await Api.getUser({id}).then(
            res => {
                const finished = res.data.finished
                if (!finished) {
                    setValid(true)
                } else {
                    alert('이미 완료된 세션입니다. 등록과정부터 다시 진행해 주세요')
                    history.push('/')
                }
            }
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
            mode === 'real' && validateUser(id)

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
            {stimulusSet !== null && < TrialLoop stimulusSet={{...stimulusSet}} mode={mode} id={id} />}

        </>
    )
}

