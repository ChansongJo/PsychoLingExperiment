import React, {useState, useEffect, useRef} from "react";
import useEventListener from "@use-it/event-listener";
import "./Experiment.css";

// https://github.com/donavon/use-event-listener

const PROGRESS_KEY = [" "];


export const Init = ({context}) => {
    const [done, setDone] = useState(false);
    useEffect(
        () => {
            console.log('start timer');
            const timer1 = setTimeout(() => setDone(true), 1500);
            return () => clearTimeout(timer1);
        }, [context]
    );

    useEffect(
        () => {
            setDone(false);
        }, [context]
    );
    return (
        <>
            {!done ? <span>+</span> : <Reading context={context} />}
        </>
    );
};


export const Reading = ({context}) => {
    const [sentence, setSentence] = useState(context.sentence);
    const [renderedSentence, setRenderedSentence] = useState(
        sentence.map(item => "__".repeat(item.length))
    );
    const [pointer, setPointer] = useState(0);
    const [done, setDone] = useState(false);

    const spacebarHandler = event => {
        const key = event.key;
        console.log(key, pointer);
        console.log(event.timeStamp);

        if (PROGRESS_KEY.includes(String(key)) && !done) {
            console.log(sentence);
            if (pointer < sentence.length) {
                let _temp = [...renderedSentence];
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
        }, [context]
    );

    return (
        <>
            {!done ? <stimuli>{renderedSentence.join("  ")}</stimuli> : <Final context={context} />}
        </>
    );
};

const Final = ({context}) => {
    const setDone = context.setAllDone;
    const spacebarHandler = event => {
        const key = event.key;

        if (PROGRESS_KEY.includes(String(key))) {
            setDone(true);
        }
    };

    useEventListener("keydown", spacebarHandler);

    return (
        <div>FINISHED</div>
    );
};




