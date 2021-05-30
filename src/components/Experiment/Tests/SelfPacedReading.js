import React, { useState, useEffect, useRef } from "react";
import useEventListener from "@use-it/event-listener";
import Judgement from './Judgement'

// https://github.com/donavon/use-event-listener

const PROGRESS_KEY = [" "];


export const SelfPacedReading = (props) => {
  const context = props.context

  const { sentence } = context.stimulus_data;
  const maskedSentence = sentence.map(item => "__".repeat(item.length));
  const [renderedSentence, setRenderedSentence] = useState(maskedSentence);
  const [pointer, setPointer] = useState(0);
  const [done, setDone] = useState(false);
  const [pressed, setPressed] = useState(false)


  const spacebarHandler = ({ key, timeStamp }) => {
      if (!pressed && PROGRESS_KEY.includes(String(key)) && !done) {
          setPressed(true)
          context.rawRT.push(timeStamp)
          if (pointer < sentence.length) {
              let _temp = [...maskedSentence];
              _temp[pointer] = sentence[pointer];
              setRenderedSentence(_temp);
              setPointer(pointer + 1);
          } else {
              context.validateReactionTime()
              setDone(true);
          }
      }
  };

  useEventListener("keydown", spacebarHandler);
  useEventListener("keyup", () => { setPressed(false) });

  useEffect(
      () => {
          setDone(false);
      }, [props]
  );

  return (
      <>
          {!done ? <stimuli>{renderedSentence.join("  ")}</stimuli> : <Judgement {...props} />}
      </>
  );
};