import React, { useState, useEffect, useRef } from "react";
import useEventListener from "@use-it/event-listener";

// https://github.com/donavon/use-event-listener

const PROGRESS_KEY = [" "];
const CHOICE_KEY = ["ㄹ", "f", "F", "ArrowRight", "ㅓ", "j", "J", "ArrowLeft"];
const CORRECT_KEY = CHOICE_KEY.slice(0, 4)
const INCORRECT_KEY = CHOICE_KEY.slice(4, 8)

const Judgement = (props) => {
  const [keyResponse, setKeyResponse] = useState(null);
  const [answer, setAnswer] = useState(null)
  const setDone = props.setTrialDone;

  const context = props.context

  const keyPressHandler = ({ key, timeStamp }) => {
      console.log(key)
      if (answer === null && CHOICE_KEY.includes(String(key))) {
          context.judgementEndTimeStamp = timeStamp
          setAnswer(CORRECT_KEY.includes(String(key)) ? true : false)
          setKeyResponse(String(key));
      } else if (answer !== null && PROGRESS_KEY.includes(String(key))) {
          context.setJudgementTestResult(answer)
          console.log('trialResult', context.__obj)
          setDone(true);
      }
  };

  useEventListener("keydown", keyPressHandler);

  return (
      <>
          <div className="instruction">
              <div className="comment">문장이 자연스러웠다면 키보드의 →키를,  </div>
              <div className="comment">자연스럽지 않았다면 키보드의 ←키를 이용해 선택해 주세요.</div>
          </div>
          <div className="choiceSet">
              <div className="choiceBox" style={{ backgroundColor: INCORRECT_KEY.includes(keyResponse) ? 'tomato' : null }}>
                <div className='choice'>
                      X
                </div>
                <div className="keyPress">← 키를 눌러 선택하세요</div>
              </div>
              <div className="choiceBox" style={{ backgroundColor: CORRECT_KEY.includes(keyResponse) ? 'chartreuse' : null }}>
                <div className='choice'>
                      O
                </div>
                <div className="keyPress">→ 키를 눌러 선택하세요</div>
              </div>
              
          </div>
          <div className='instruction'>
                  <div className="comment">선택을 완료한 후에는 Space Bar를 눌러 다음으로 진행하세요.</div>
              </div>
      </>
  );
};

export default Judgement
