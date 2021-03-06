import React, { useState, useEffect } from "react";
import { useParams, useHistory } from 'react-router-dom';
import InitExperiment from "./Procedures";
import useEventListener from "@use-it/event-listener";

import { ExperimentContext } from "../../models/ExperimentContext"
import * as Api from "../../api"
import './Experiment.css';
const PROGRESS_KEY = [" "];

function TrialLoop({ stimulusSet, id, mode }) {
    const [trialDone, setTrialDone] = useState(true);
    const [ready, setReady] = useState(false);
    const [context, setContext] = useState(null);
    const [results, setResults] = useState([])
    const [count, setCount] = useState(-1)


    useEventListener('keydown', ({ key }) => { !ready && PROGRESS_KEY.includes(String(key)) && setReady(true) })

    useEffect(
        () => {
            if (trialDone === true) {
                console.log(stimulusSet)
                const stimulus = stimulusSet.stimuli.pop()
                const group = stimulusSet.group

                let _context
                if (stimulus !== undefined) {
                    _context = new ExperimentContext({ group, stimulus_data: stimulus, stimulus: stimulus.id, session_id: id, order: count + 1 });
                } else {
                    _context = new ExperimentContext({ group, session_id: id })
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
            {!ready 
                ? <div className='instruction'>
                    <div className='comment'>지금부터 {mode==='real'? '실험' : '연습'}을 시작하겠습니다.</div>
                    {mode === 'real' && <div>
                        <div className='comment'>실험을 진행하시는 동안에는, 조용한 곳에 혼자 계십시오.</div>
                        <div className='comment'>실험 문장은 총 120개 이며, 40문장 당 한 번씩,</div>
                        <div className='comment'>총 두 번의 휴식 시간을 드립니다.</div>
                        <div className='comment'>휴식 시간 전까지는, 본인의 읽기 속도에 맞추어</div>
                        <div className='comment'>침착하게 진행하시면 됩니다.</div>
                    </div>}
                    <div className='comment'>준비가 되셨으면, 스페이스바를 눌러 진행하여 주십시오.</div>
                </div>
                : context !== null && <InitExperiment context={context} setTrialDone={setTrialDone} mode={mode} />}
        </div>
    );
}

export default function Experiment({ mode = 'real' }) {
    const { id } = useParams();
    const [stimulusSet, setStimulusSet] = useState(null)
    const [valid, setValid] = useState(false)
    const history = useHistory()
    const sentenceList = [
        "철수는 어제 학교에 갔다가 그냥 돌아왔다.",
        "영희는 그런 철수가 한심하게 느껴졌다.",
        "오늘 서울의 날씨는 비가 올 예정임."
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
        await Api.getStimuli({ id }).then(
            res => {
                console.log(res.data)
                setStimulusSet(res.data)
            }
        ).catch(e => console.log(e))
    }
    const validateUser = async (id) => {
        await Api.getUser({ id }).then(
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
            {stimulusSet !== null && < TrialLoop stimulusSet={{ ...stimulusSet }} mode={mode} id={id} />}

        </>
    )
}

