import React, {useState, useEffect} from 'react'

function Box({left, top, timeOffset = 0}) {
    const [color, setColor] = useState("orange");
    useEffect(() => {
        console.log(timeOffset);
        setTimeout(() => {
            setColor("yellow");
            setTimeout(() => {
                setColor("orange");
            }, 300);
        }, timeOffset);
    }, []);

    const handleClick = () => {
        setColor("yellow");
    };

    return (
        <div
            onClick={() => handleClick()}
            style={{
                width: 70,
                height: 70,
                border: "0.1em solid",
                position: "absolute",
                left: left,
                top: top,
                backgroundColor: color
            }}
        ></div>
    );
}


export default function CorsiTest() {
    let freezeClic = false;
    document.addEventListener("click", freezeClicFn, true);
    function freezeClicFn(e) {
        if (freezeClic) {
            e.stopPropagation();
            e.preventDefault();
        }
    }


    const [divs, setDivs] = useState([]);
    useEffect(() => {
        freezeClic = true;
        setTimeout(() => {
            freezeClic = false;
            document.getElementById("field").style.cursor = "";
        }, 3000); // 초 계산해서 넣어야 함...
    }, [divs]);

    const getRandCoord = () => {
        return Math.floor((Math.random() - 0.5) * 300);
    };

    const resetDivs = () => {
        const center_y = 200;
        const center_x = window.innerWidth / 2;
        const boxes = []; // 10개
        document.getElementById("field").style.cursor = "none";

        let count = 0;

        const isOverlap = (x, y) => {
            // return true if overlapping
            const size = {x: 75, y: 75};

            for (const box of boxes) {
                if (
                    x > box.props.left - size.x &&
                    x < box.props.left + size.x &&
                    y > box.props.top - size.y &&
                    y < box.props.top + size.y
                )
                    return true;
            }
            return false;
        };

        while (boxes.length < 9) {
            const x = center_x + getRandCoord() * 1.5;
            const y = center_y + getRandCoord();
            if (!isOverlap(x, y)) {
                count++;
                boxes.push(
                    <Box
                        left={x}
                        top={y}
                        timeOffset={count * 0.5 * 1000}
                        key={Math.random()}
                    />
                );
            }
        }
        setDivs(boxes);
    };

    return (
        <div
            id="field"
            style={{
                width: 600,
                height: 400,
                display: "inline-block"
            }}
        >
            {divs}
            <button onClick={() => resetDivs()}>click</button>
        </div>
    );
}