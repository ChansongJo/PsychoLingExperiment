import React, {useState, useEffect} from 'react'

export const Clock = () => {
    const [currentTime, setCurrentTime] = useState(null)
    useEffect(
        () => {
            const interval = setInterval(() => {
                setCurrentTime(new Date().toLocaleString())
            }, 1000)
            return () => clearInterval(interval)
        }, [])
    return <span style={{
        fontFamily: 'courier',
        fontSize: 'large'
    }}> {currentTime}</span >
}
