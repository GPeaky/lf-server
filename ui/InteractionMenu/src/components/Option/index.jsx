import styled from '@emotion/styled'
import OptionData from './OptionData'
import OptionSlider from './OptionSlider'

export default function Option({ title, description, numberOption, options, dataOption }){
    const OptionStyled = styled.div`
        padding: 10px;
        background: #1b1d23;
        border-bottom: 1px solid #22252e;
        cursor: pointer;
        transition: 300ms all;
        overflow: hidden;
        height: 50px;
        :hover {
            background: #2a2d36;
        }
        .principalData {
            display: flex;
            flex-flow: row wrap;
            justify-content: space-between;
            font-size: 14px;
        }
    `

    const calculateHeight = () => {
        let height = 120
        for(let i = 0; i < Object.keys(dataOption).length; i++){
            height += 40
        }

        return height
    }

    const showOption = () => {
        window.mp?.trigger('InteractionMenu:optionSelected', 'Option')

        const height = dataOption ? `${calculateHeight()}px` : '140px'
        const optionDiv = document.querySelector(`.optionDiv.option${numberOption}`)
        if ( !optionDiv ) return

        if (optionDiv.style.height && optionDiv.style.height === height) {
            optionDiv.style.border = '1px solid #22252e'
            optionDiv.style.background = '#1b1d23'
            optionDiv.style.height = '50px'
        } else {
            optionDiv.style.border = '1px solid #223286'
            optionDiv.style.background = '#090e25'
            optionDiv.style.height = height
        }
    }


    return(
        <OptionStyled className={`optionDiv option${numberOption}`}>
            <div className="principalData" onClick={showOption}>
                <p className="nameOption" dangerouslySetInnerHTML={{__html: title}}></p>
                { description && <div dangerouslySetInnerHTML={{__html: description}}></div> }
            </div>

            { options && 
                <OptionSlider 
                    numberOption={ numberOption } 
                    options={ options } 
                />
            }

            { dataOption &&
                <OptionData 
                    data={ dataOption }  
                />
            }

        </OptionStyled>
    )
}