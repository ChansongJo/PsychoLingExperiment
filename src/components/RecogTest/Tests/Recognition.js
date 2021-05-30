import React, { useState, useEffect, useRef } from "react";
import { Image } from 'semantic-ui-react'
import useEventListener from "@use-it/event-listener";

// https://github.com/donavon/use-event-listener

const PROGRESS_KEY = [" "];
const CHOICE_KEY = ["ㄹ", "f", "F", "ArrowLeft", "ㅓ", "j", "J", "ArrowRight"];
const CORRECT_KEY = CHOICE_KEY.slice(0, 4)
const INCORRECT_KEY = CHOICE_KEY.slice(4, 8)


export const Recognition = (props) => {
  const { question, img, answer: userAnswer, correct, mode } = props.context.stimulus ?? {}
  const context = props.context

  const setDone = props.setTrialDone;
  const [answer, setAnswer] = useState(null)
  const [keyResponse, setKeyResponse] = useState(null);


  const keyPressHandler = ({ key }) => {
        console.log(key)
        if (answer === null && CHOICE_KEY.includes(String(key))) {
            setAnswer(CORRECT_KEY.includes(String(key)) ? true : false)
            setKeyResponse(String(key));
        } else if (answer !== null && PROGRESS_KEY.includes(String(key))) {
            context.correct = answer === context.stimulus.answer
            setDone(true);
        }
    };

    useEventListener("keydown", keyPressHandler);

  useEffect(
      () => {
          setDone(false);
      }, []
  );

  return (
    <>
        <div className="instruction">
            <div className="comment bigger">{question}</div>
            <div className="comment"><Image src={img} style={{height: '300px'}}/></div>

        </div>
        <div className="choiceSet">
            <div className="choiceBox" style={{backgroundColor: CORRECT_KEY.includes(keyResponse) ? 'chartreuse' : null }}>
                <div className='choice'>
                    예
                </div>
                <div className="keyPress">← 키를 눌러 선택하세요</div>
            </div>
            <div className="choiceBox" style={{ backgroundColor: INCORRECT_KEY.includes(keyResponse) ? 'tomato' : null }}>
                <div className='choice'>
                    아니오
                </div>
                <div className="keyPress">→ 키를 눌러 선택하세요</div>
            </div>
            
        </div>
    </>
  );
};