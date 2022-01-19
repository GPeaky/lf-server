import './index.css'
import { useState } from 'react'

export default function Speedometer() {
    const [ rpm, setRpm ] = useState(0)
    const [ gear, setGear ] = useState(0)
    const [ speed, setSpeed ] = useState(0)

    window.mp?.events.add('speedometer::update', (rpm, speed, gear) => {
        setRpm(rpm)
        setSpeed(speed)
        setGear(gear)
    })

    return (
        <>
            <div id="fondoTacometro">
                <div id="tachometer">
                    <div className="progress-bar">
                        <span style={{ width: `${ speed / 2.0 }%` }}>
                            <div className="bg-span"></div>
                        </span>
                    </div>
                    <div className="km">
                        <p>
                            <span>{ speed }</span> Kph
                        </p>
                    </div>
                </div>
                <div id="rpm">
                    <div className="progress-bar-rpm">
                        <span style={{ width: `${ rpm / 100 }%` }}>
                            <div className="bg-span-rpm"></div>
                        </span>
                    </div>
                    <div className="rpm">
                        <p>
                            <span>{ rpm }</span> Rpm
                        </p>
                    </div>
                </div>
                <div id="cambio">
                    <h3 id="h3_cambio">{ gear }</h3>
                </div>
            </div>
        </>
    )
}