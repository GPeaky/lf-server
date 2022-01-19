import { useState } from 'react'
import styled from '@emotion/styled'
import healthImg from '../../static/images/live.png'
import hungryImg from '../../static/images/hungry.png'
import thirstImg from '../../static/images/thirst.png'
import staminaImg from '../../static/images/stamina.png'


export default function Hud() {
    const [ { money, health, hungry, thirst, stamina }, setHud ] = useState({
        money: 0,
        health: 100,
        hungry: 100,
        thirst: 100,
        stamina: 100
    })

    window.mp?.events.add('Hud::Update', (money, health, hungry, thirst, stamina) => {
        setHud({
            money,
            health,
            hungry,
            thirst,
            stamina
        })
    })

    const HudStyled = styled.div`
        position: absolute;
        bottom: 0;
        right: 0;
        top: 0;
        left: 0;
        .hud {
        position: absolute;
        bottom: 150px;
        left: 0;
        display: flex;
        flex-flow: column wrap;
        align-items: center;
        width: 300px;
        padding: 20px;
        border-radius: 0px 20px 0px 0px;
        z-index: 2;
        .bars {
            .stamina,
            .live {
            display: flex;
            flex-flow: row wrap;
            align-items: center !important;
            background: #025A91;
            box-shadow: 0px 0px 6px #5C6F69;
            //background: rgba(0, 0, 0, 0.7);
            //border-radius: 10px;
            border-radius: 4px;
            padding: 10px;
            width: 100%;
            //border: 2px solid #f39327;
            //box-shadow: 0px 0px 3px #f39327 inset;
            .imageStamina,
            .imageLive {
                margin-right: 10px;
                width: 25px;
                margin-bottom: -5px;
            }
            .barStamina,
            .barLive {
                width: 170px;
                height: 30px;
                border-radius: 4px;
                overflow: hidden;
                background: #004B79;
                box-shadow: inset 0px 4px 4px rgba(0, 0, 0, 0.25);
                .progressStamina,
                .progressLive {
                width: 80%;
                box-shadow: inset 0px 4px 4px rgba(0, 0, 0, 0.25);
                height: 100%;
                opacity: 0.8;
                }
            }
            }
            .live {
            .barLive {
                .progressLive {
                background: #f61a00;
                width: ${ health }% !important;
                }
            }
            }
            .barStamina {
            .progressStamina {
                background: #f1ee18;
                width: ${ stamina }% !important;
            }
            }
            }
            .stamina {
            margin-top: 10px;
            }
        }
        .stats {
            display: flex;
            flex-flow: row wrap;
            width: 100%;
            justify-content: space-evenly;
            margin-top: 10px;
            .hungry,
            .thirst {
            display: flex;
            flex-flow: column wrap;
            align-items: center;
            margin-top: 10px;
            font-weight: bold;
            background: #025A91;
            box-shadow: 0px 0px 6px #5C6F69;
            border-radius: 4px;
            //background: rgba(0, 0, 0, 0.7);
            padding: 10px;
            width: 70px;
            //border-radius: 20px;
            //border: 2px solid #f39327;
            //box-shadow: 0px 0px 3px #f39327 inset;
            .imageThirst,
            .imageHungry {
                padding: 10px;
                width: 100%;
                background: #004B79;
                box-shadow: inset 0px 4px 4px rgba(0, 0, 0, 0.25);
            }
            p {
                margin-top: 5px;
            }
            }
            .hungry {
            color: #ce731d;
            }
            .thirst {
            color: #1d8dce;
            }
        }
        }
        .bottomHud {
            position: absolute;
            width: 220px;
            height: 130px;
            left: 20px;
            bottom: 280px;
            
            background: linear-gradient(90deg, #BBD2C5 0%, #536976 100%);
            opacity: 0.7;
            box-shadow: 0px 0px 7px #5C6F69;
            border-radius: 5px 44px 44px 5px;
            
            /*Linear Gradient
            #536976
            100 %
            #BBD2C5
            100 %*/
        }
        .money {
            position: absolute;
            bottom: 20px;
            left: 350px;
            background: #004B79;
            box-shadow: 0px 0px 6px #5C6F69, inset 0px 4px 4px rgba(0, 0, 0, 0.25);
            width: 200px;
            padding: 10px;
            border: 5px solid #025A91;
            border-radius: 4px;
            color: #10a710;
        }

        img {
            width: 100%;
        }
    `


    return (
        <HudStyled className='menuDiv'>
            <div className="hud">
                <div className="bars">
                    <div className="live">
                    <div className='imageLive'>
                        <img alt='live' src={ healthImg } />
                    </div>
                    <div className="barLive"><div className="progressLive"></div></div>
                    </div>
                    <div className="stamina">
                    <div className='imageStamina'>
                        <img alt='stamina' src={ staminaImg } />
                    </div>
                    <div className="barStamina"><div className="progressStamina"></div></div>
                    </div>
                </div>
                <div className="stats">
                    <div className="hungry">
                    <div className="imageHungry">
                        <img alt='hungry' src={ hungryImg } />
                    </div>
                    <p>{ hungry }%</p>
                    </div>
                    <div className="thirst">
                    <div className="imageThirst">
                        <img alt='thirst' src={ thirstImg } />
                    </div>
                    <p>{ thirst }%</p>
                    </div>
                </div>
            </div>
            <div className="bottomHud"></div>
            <div className="money">
                <span style={{fontWeight: 'bold'}}>$</span> { money }
            </div>
      </HudStyled>
    )
}