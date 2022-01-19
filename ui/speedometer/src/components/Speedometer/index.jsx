import './index.css'
import { useState } from 'react'

export default function Speedometer() {
    const [{ speed, rpm, gear, fuel}, setData] = useState({
        speed: 0,
        gear: 'N',
        fuel: 0,
        rpm: 0,
    })

    window.mp?.events.add('speedometer::update', (rpm, speed, gear, fuel) => {
        if (gear === 0) gear = 'N' 
        if (gear === 'N' && speed > 0) gear = 'R'

        setData({
            speed, rpm, gear, fuel
        })
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