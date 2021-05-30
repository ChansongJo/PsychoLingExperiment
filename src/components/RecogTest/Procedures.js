import React, { useState, useEffect, useRef } from "react";
import useEventListener from "@use-it/event-listener";
import "./Experiment.css";
import CorsiTest from "../CorsiTest";
import { Recognition } from "./Tests/Recognition";

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
                if (order >= BREAK_INDEX && order % BREAK_INDEX === 0) {
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
                : <CorsiTest {...props} />}
        </>
    );
};

const Breakpoint = (props) => {
    const setBreak = props.setBreak
    useEventListener("keydown", ({key}) => PROGRESS_KEY.includes(String(key) && setBreak(false)));

    return <div className='instruction'>
            <div className='comment'>지금은 휴식시간입니다.</div>
            <div className='comment'>실험 중이오니, 휴식 시간이 너무 지체되지 않기를 바랍니다.</div>
            <div className='comment'>휴식이 완료되면 SPACE bar를 눌러 다음으로 진행하세요.</div>
            </div>
}

export default ExperimentHandler;




