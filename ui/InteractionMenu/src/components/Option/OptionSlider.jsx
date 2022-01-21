import styled from '@emotion/styled'

export default function OptionSlider({ options, numberOption, onClick }) {
    let margin = '0px'

    const OptionSliderStyled = styled.div`
        display: flex;
        flex-flow: column wrap;
        .slider {
            display: flex;
            flex-flow: row wrap;
            justify-content: center;
            align-items: center;
            margin-top: 40px;
            .options {
                width: 200px;
                overflow: hidden;
                margin-top: -5px;
                border: none;
                .optionsRotate {
                display: flex;
                flex-flow: row wrap;
                padding: 0px 30px 0px 20px;
                width: 2000px; 
                transition: 300ms all;
                margin-left: ${margin};
                }
            }
            .left, .right {
                height: 20px;
                width: 50px;
                border-radius: 20px;
                border: 1px solid #223286;
                background: #090e25;
                color: #223286;
                font-weight: bold;
                font-family: Ubuntu;
                text-align: center;
                cursor: pointer;
                transition: 300ms all;
            }

            .left:hover, .right:hover {
                background: #1b296d;
            }

            .disabled {
                cursor: auto;
                opacity: 0.3;
            }

            .disabled:hover {
                background: #090e25;
            }
        }

        .buttonBuy {
            width: 80%;
            margin: 0 auto;
            margin-top: 10px;
            padding: 10px;
            background-color: #223286;
            border: none;
            border-radius: 20px; 
            color: white;
        }
    `

    let state = 0;
    let rotate = false;

    const rotateSlider = direction => {
        const optionsRotate = document.querySelector(`.optionsRotate.list${numberOption}`)
        const buttonLeft = document.querySelector(`.left.list${numberOption}`)
        const buttonRight = document.querySelector(`.right.list${numberOption}`)

        if( optionsRotate && buttonLeft && buttonRight) {
            const marginLeft = parseInt(optionsRotate.style.marginLeft)

            if(!rotate && direction === 'right') {
                optionsRotate.style.marginLeft = '-215px'
                rotate = true
                state++
            } else if ( direction === 'right' && buttonRight.className !== `right list${numberOption} disabled`) {
                optionsRotate.style.marginLeft = `${marginLeft - 195}px`
                state++

                if (state === options.length - 1) buttonRight.className = 'right list' + numberOption + ' disabled'
                if (buttonLeft.className === 'left list' + numberOption + ' disabled') buttonLeft.className = 'left list' + numberOption
            } else if (direction === 'left' && buttonLeft.className !== 'left list' + numberOption + ' disabled') {
                optionsRotate.style.marginLeft = (marginLeft + 195) + 'px'
                state--
                if (state === 0) buttonLeft.className = 'left list' + numberOption + ' disabled'
                if (buttonRight.className === 'right list' + numberOption + ' disabled') buttonRight.className = 'right list' + numberOption 
            }
        }
    }

    return (
        <OptionSliderStyled> 
            <div className="slider">
                <button className={state === 0 ? `left list${numberOption} disabled` : `left list${numberOption}`} onClick={() => rotateSlider('left')}></button>
                <div className="options">
                    <div className={ `optionsRotate list${numberOption}`} style={{ marginLeft: '-20px'}}>
                        {options.map(data => {
                            return (
                                <p 
                                    key={ data }
                                    className={`option list${numberOption}`}
                                    style={{
                                        display: 'block',
                                        width: '195px',
                                        textAlign: 'center',
                                    }}
                                    dangerouslySetInnerHTML={{ __html: data }}
                                ></p>
                            )
                        })}
                    </div>
                </div>
                <button className={state === options.length ? 'right list' + numberOption + ' disabled' : 'right list' + numberOption} onClick={() => rotateSlider('right')}>{'>'}</button>
            </div>
            <button className='buttonBuy'>Dinero insuficiente</button>
        </OptionSliderStyled>
    )
}