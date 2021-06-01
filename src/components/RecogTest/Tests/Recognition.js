import React, { useState, useEffect, useRef } from "react";
import { Image, Item } from 'semantic-ui-react'
import useEventListener from "@use-it/event-listener";

// https://github.com/donavon/use-event-listener

const PROGRESS_KEY = [" "];
const CHOICE_KEY = ["ㄹ", "f", "F", "ArrowRight", "ㅓ", "j", "J", "ArrowLeft"];
const CORRECT_KEY = CHOICE_KEY.slice(0, 4)
const INCORRECT_KEY = CHOICE_KEY.slice(4, 8)


export const Recognition = (props) => {
  const { question, img, answer: correctAnswer, mode, question_after } = props.context.stimulus ?? {}
  const context = props.context

  const setDone = props.setTrialDone;
  const [answer, setAnswer] = useState(null)
  const [keyResponse, setKeyResponse] = useState(null);
  const isTwoPage = mode === 'two-page'

  const [ready, setReady] = useState(false)
  useEffect(
      () => {
          if (!ready) {
              const timer1 = setTimeout(() => setReady(true), 4000);
              return () => clearTimeout(timer1);}
      }, [ready]
  )


  const keyPressHandler = ({ key }) => {
        console.log(key)
        if ((!isTwoPage || ready) && answer === null && CHOICE_KEY.includes(String(key))) {
            setAnswer(CORRECT_KEY.includes(String(key)) ? true : false)
            setKeyResponse(String(key));
        } else if ((!isTwoPage || ready) && answer !== null && PROGRESS_KEY.includes(String(key))) {
            context.correct = answer === correctAnswer
            props.context.order < 3 && alert(
                context.correct ?  "정답입니다." : "오답입니다."
            )
            setDone(true);
        }
    };

    useEventListener("keydown", keyPressHandler);

  useEffect(
      () => {
          setDone(false);
      }, []
  );

  const ItemProps = {question, img, keyResponse, question_after, ready}

  return (
    <>
        {isTwoPage
            ? <TwoPageItem {...ItemProps}/>
            : <CommonItem {...ItemProps}/>
        }
       

    </>
  );
};

const CommonItem = ({question, img, keyResponse}) => (
    <>
        <div className="instruction">
            <div className="comment bigger">{question}</div>
            {img && <div className="comment"><Image src={img} style={{height: '300px'}}/></div>}
        </div>
        <div className="choiceSet">
            <div className="choiceBox" style={{ backgroundColor: INCORRECT_KEY.includes(keyResponse) ? 'tomato' : null }}>
                <div className='choice'>
                    아니오
                </div>
                <div className="keyPress">← 키를 눌러 선택하세요</div>
            </div>
            <div className="choiceBox" style={{backgroundColor: CORRECT_KEY.includes(keyResponse) ? 'chartreuse' : null }}>
                <div className='choice'>
                    예
                </div>
                <div className="keyPress">←→ 키를 눌러 선택하세요</div>
            </div>
        </div>
        <div className='instruction'>
            <div className="comment less">선택을 완료한 후에는 Space Bar를 눌러 다음으로 진행하세요.</div>
        </div>
    </>
)

const TwoPageItem = ({question, ready, question_after, img, keyResponse}) => {
    return <>
        <div className="instruction">
            <div className="comment bigger">{!ready ? question : question_after}</div>
            {img && !ready && <div className="comment" style={{height: '300px', textAlign: 'center'}}><Image src={img}/></div>}
        </div>
        <>
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
        <div className='instruction'>
            <div className="comment less">{ready && "선택을 완료한 후에는 Space Bar를 눌러 다음으로 진행하세요."}</div>
        </div>
        </>
    </>
}
