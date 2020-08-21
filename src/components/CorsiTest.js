import React, {useState, useEffect} from 'react'
import {useHistory} from 'react-router-dom'

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


export default function CorsiTest() {
    let freezeClic = false;
    const history = useHistory()
    const [done, setDone] = useState(false)

    document.addEventListener("click", freezeClicFn, true);
    function freezeClicFn(e) {
        if (freezeClic) {
            e.stopPropagation();
            e.preventDefault();
        }
    }

    // init
    useEffect(() => {
        resetDivs()
    }, [])

    //finish
    useEffect(() => {
        if (done) {
            alert('실험 종료')
            history.push('/')
        }
    }, [done])

    const [divs, setDivs] = useState([]);
    useEffect(() => {
        freezeClic = true;
        setTimeout(() => {
            freezeClic = false;
            if (document.getElementById('field') !== null) {
                document.getElementById("field").style.cursor = "";
            }
        }, 100 + level * INTERVAL_TIME); // 초 계산해서 넣어야 함...
    }, [divs]);


    const getRandCoord = () => {
        return Math.floor((Math.random()) * 400);
    };

    const compareArray = (arr1, arr2) => {
        return arr1.length === arr2.length && arr1.every((value, index) => value === arr2[index])
    }

    const handleFinish = () => {
        const coords = divs.slice(0, level).map(item => item.props.order)
        if (life > 0 && level < 10) {
            if (compareArray(coords, response)) {
                level++
                life = 2
            } else {
                life === 1 && setDone(true)
                life = life - 1
            }
            resetDivs()
        } else {
            setDone(true)
        }
        response = []
    }

    const resetDivs = () => {
        const boxes = []; // 10개
        document.getElementById("field").style.cursor = "none";

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
        <div className='experiment-body'>
            <div>
                <button onClick={() => handleFinish()} >완료!!</button>
                <div>DEBUG level = {level} / life = {life}</div>

            </div>
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
        </div>
    );
}