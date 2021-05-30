import React, { useState, useEffect, useRef } from "react";
import useEventListener from "@use-it/event-listener";
import "./Experiment.css";
import CorsiTest from "../CorsiTest";
import { Recognition } from "./Tests/Recognition";
import { useParams, useHistory } from "react-router-dom";
import { patchUserData } from '../../api'

// https://github.com/donavon/use-event-listener

const PROGRESS_KEY = [" "];
const BREAK_INDEX = 3

const ExperimentHandler = (props) => {
    const [ready, setReady] = useState(false);
    const [breakpoint, setBreakpoint] = useState(false)
    const isExperimentEnd = props.context.isExperimentEnd
    const order = props.context.order

    useEffect(
        () => {
            if (!isExperimentEnd && !breakpoint) {
                const timer1 = setTimeout(() => setReady(true), 1500);
                return () => clearTimeout(timer1);}
        }, [props, breakpoint, isExperimentEnd]
    )

    useEffect(
        () => {
            setReady(false);
            setBreakpoint(false)
            if (!isExperimentEnd) {
                if (order === BREAK_INDEX) {
                    setBreakpoint(true)
                }
            }
        }, [isExperimentEnd, order, props]
    );
    return (
        <>  
            {!isExperimentEnd
                ? !breakpoint
                    ? !ready 
                        ? <crosshair>+</crosshair>
                        : <Recognition {...props} />
                    : <Breakpoint setBreak={setBreakpoint} />
                : <Final {...props} mode='real' />}
        </>
    );
};

const Breakpoint = (props) => {
    const setBreak = props.setBreak
    useEventListener("keydown", ({key}) => PROGRESS_KEY.includes(String(key) && setBreak(false)));

    return <div className='instruction'>
            <div className='comment'>이제 본 검사를 실시하겠습니다.</div>
            <div className='comment'>준비가 되었으면, 스페이스바를 눌러 다음으로 진행하세요.</div>
    </div>
}



const Final = ({mode, context, corsiSpan}) => {
    const { id } = useParams()
    const history = useHistory()

    const uploadResults = async (id, score) => {
        await patchUserData(id, {'recognition_test_result': score}).then(
            console.log('recog test data is saved')
        ).catch(
            e => console.log(e)
        )
    }

    useEffect(
        () => {
            if (mode === 'real') {
                let score = 0
                for (const i of context.results.slice(3,)) {
                    if (i) score++
                }
                // console.log('score', score)
                uploadResults(id, score)
                alert(
                    "사전 검사가 종료 되었습니다. 본 실험 안내 페이지로 이동합니다."
                )
                // 링크 이동
                history.push(`/${id}`)
            }
        }, []
    )
    return (
        <>
        </>
    );
};
export default ExperimentHandler;




