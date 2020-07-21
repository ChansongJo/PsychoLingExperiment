import React, {useState, useEffect} from "react";
import {useParams, useHistory} from 'react-router-dom';
import {Init} from "./ExpProps";
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
    const [sentence, setSentence] = useState([]);

    const getNewSentence = () => {
        const sent = sentenceList[pointer];
        setPointer((pointer + 1) % 3);
        setSentence(sent.split(" "));
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
                <h3>Test Trial</h3>
            </header >
            <body>
                <Init context={{sentence, setAllDone}} />
            </body>
        </>
    );
}