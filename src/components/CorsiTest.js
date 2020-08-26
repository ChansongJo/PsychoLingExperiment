import React, {useState, useEffect} from 'react'
import useEventListener from "@use-it/event-listener";
import * as Api from "../api"

const BOX_NUM = 9
const BOX_SIZE = 90
const BLINK_TIME = 350 // ms
const INTERVAL_TIME = 600
let response = []
let level = 2
let life = 2


function Box({left, top, timeOffset = 0, order}) {
    const [color, setColor] = useState("orange");
    const [done, setDone] = useState(false)
    useEffect(() => {
        if (timeOffset !== 0) {
            setTimeout(() => {
                setColor("yellow");
                setTimeout(() => {
                    setColor("orange");
                }, BLINK_TIME);
            }, timeOffset);
        }
    }, []);

    const handleClick = () => {
        !done && response.push(order)
        setDone(true)
        setColor("yellow");
    };

    return (
        <div
            onClick={() => handleClick()}
            style={{
                width: BOX_SIZE,
                height: BOX_SIZE,
                border: "0.1em solid",
                position: "absolute",
                left: left,
                top: top,
                backgroundColor: color
            }}
        ></div>
    );
}

const isOverlap = (x, y, boxes) => {
    // return true if overlapping

    for (const box of boxes) {
        if (
            x > box.props.left - BOX_SIZE &&
            x < box.props.left + BOX_SIZE &&
            y > box.props.top - BOX_SIZE &&
            y < box.props.top + BOX_SIZE
        )
            return true;
    }
    return false;
};

export default function CorsiTest(props) {
    let freezeClic = false;
    const [done, setDone] = useState(false)
    const [ready, setReady] = useState(false)
    const beep = new Audio('/static/beep.wav')
    const levelLimit = (props.mode === 'real') ? 10 : 4

    document.addEventListener("click", freezeClicFn, true);
    function freezeClicFn(e) {
        if (freezeClic) {
            e.stopPropagation();
            e.preventDefault();
        }
    }

    // init
    useEffect(() => {
        ready && resetDivs()
    }, [ready])



    const [divs, setDivs] = useState([]);
    useEffect(() => {
        if (ready && !done) {
            freezeClic = true;
            setTimeout(() => {
                freezeClic = false;
                document.body.style.cursor = "";
                beep.play()
            }, 750 + level * INTERVAL_TIME)

        }

    }, [divs]);


    const getRandCoord = () => {
        return Math.floor((Math.random()) * 400);
    };

    const compareArray = (arr1, arr2) => {
        return arr1.length === arr2.length && arr1.every((value, index) => value === arr2[index])
    }

    const handleFinish = () => {
        const coords = divs.slice(0, level).map(item => item.props.order)
        if (life > 0 && level < levelLimit) {
            if (compareArray(coords, response)) {
                level++
                life = 2
            } else {
                life = life - 1
            }

            if (life === 0) {
                setDone(true)
            } else {
                resetDivs()
            }
        } else {
            setDone(true)
        }
        response = []
    }

    const resetDivs = () => {
        const boxes = [];
        document.body.style.cursor = "none";

        let count = 0;

        while (boxes.length < BOX_NUM) {
            const x = getRandCoord() * 1.5;
            const y = getRandCoord();
            if (!isOverlap(x, y, boxes)) {
                count++;
                boxes.push(
                    <Box
                        left={x}
                        top={y}
                        timeOffset={(count <= level) ? count * INTERVAL_TIME : 0}
                        key={`${x},${y}`}
                        order={count}
                    />
                );
            }
        }
        setDivs(boxes);
    };

    return (
        !ready
            ? <CorsiInstruction setReady={setReady} /> // 1
            : !done // 2
                ? <>
                    <div
                        id="field"
                        style={{
                            width: 800,
                            height: 600,
                            position: "relative"
                        }}
                    >
                        {divs}
                    </div>
                    <div>
                        <button onClick={() => handleFinish()} >완료!!</button>
                    </div>
                </>
                : <Final {...props} corsiSpan={(level + life > 10) ? level : level - 1} />
    );
}

const CorsiInstruction = (props) => {
    useEventListener("keydown", ({key}) => String(key) === ' ' && setReady(true));

    const [ready, setReady] = useState(false)
    useEffect(
        () => {

            ready && setTimeout(() => {
                props.setReady(true)
            }, 3000)
        }
    )
    return (
        <div className='instruction'>
            {!ready
                ? <>
                    <div className="comment">이 과제에서 당신은 마우스를 이용해야 합니다.</div>
                    <div className="comment">화면에 9개의 오렌지 색 상자가 등장합니다.</div>
                    <div className="comment">상자 중 일부가 순서대로 노란색으로 반짝입니다.</div>
                    <div className="comment">신호음이 들리고 나면 앞서 반짝였던 순서에 맞추어 상자를 클릭하고 </div>
                    <div className="comment"> 완료 버튼을 눌러주십시오.</div>
                    <div></div>

                    <div className="comment bold">준비가 완료되면 스페이스 바를 눌러 진행하세요.</div>
                </>
                : <div className="comment bold">준 비</div>
            }
        </div >)
}


const Final = ({mode, context, corsiSpan}) => {
    const uploadResults = async (id, {corsiSpan, results, group}) => {
        await Api.postExperimentResults(results, {id, group, corsiSpan}).then(
            res => alert('업로드가 완료되었습니다. ')
        ).catch(
            e => console.log(e)
        )
    }


    useEffect(
        () => {
            if (mode === 'real') {
                console.log(context)
                uploadResults(context.sessionId, {corsiSpan, results: context.results, group: context.group})
            }
            life = 2
            level = 2
            response = []
        }, []
    )
    return (
        (mode === 'real')
            ? <div className="instruction">
                <div className="comment bold">실험이 종료되었습니다. </div>
                <div className="comment bold">긴 시간 대단히 고생하셨습니다. </div>
                <div className="comment bold">감사합니다. </div>
            </div>
            : <div className='instruction'>
                <div className='comment bold'>연습이 종료되었습니다.</div>
                <div className='comment bold'>ESC key를 눌러 이전 페이지로 돌아갈 수 있습니다.</div>
            </div>
    );
};