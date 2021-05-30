import React, { useState, useEffect, useCallback } from "react";
import { useParams, useHistory } from 'react-router-dom';
import InitExperiment from "./Procedures";
import useEventListener from "@use-it/event-listener";

import {stimuli, stimuliPractice} from './Stimui'
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
                const stimulus = stimulusSet.pop()
                const _context = { 
                    stimulus,
                    session_id: id, 
                    order: count + 1,
                    isExperimentEnd: stimulus === undefined
                }

                console.log('newcon', _context)
                setCount(count + 1)

                // 1턴은 제외...
                context !== null && setResults([...results, context.correct])
                if (_context.isExperimentEnd) {
                    _context.results = [...results, context.correct]
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
                    <div className='comment'>준비가 되셨으면, SPACE bar를 눌러 진행하여 주십시오.</div>
                </div>
                : context !== null && <InitExperiment context={context} setTrialDone={setTrialDone} mode={mode} />}
        </div>
    );
}

export default function RecogTest({ mode = 'real' }) {
    const { id } = useParams();

    const [stimulusSet, setStimulusSet] = useState(stimuli.concat(stimuliPractice))
    const [valid, setValid] = useState(false)
    const history = useHistory()


    const validateUser = useCallback(async (id) => {
        if (id === 'test') return

        await Api.getUser({ id }).then(
            res => {
                const recogResult = res.data.recognition_test_result
                if (!recogResult !== -1) {
                    setValid(true)
                } else {
                    alert('검사 결과가 이미 존재합니다. 본 검사 페이지로 이동합니다.')
                    history.push('/' + id)
                }
            }
        ).catch(
            e => {
                console.log(e.response)
                alert('유효하지 않은 session_id입니다. 실험을 진행할 수 없습니다!')
                history.push('/')
            }
        )
    }, [history])

    useEffect(
        () => {
            validateUser(id)
        }, [id, validateUser]
    )

    return (
        <>
            <div className='experiment-header'>
                <div className="status" >
                    <span> session-id : {id}</span>
                </div>
            </div >
            {stimulusSet !== null && < TrialLoop stimulusSet={stimulusSet} mode={mode} id={id} />}

        </>
    )
}

