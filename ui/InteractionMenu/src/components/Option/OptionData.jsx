import styled from '@emotion/styled'

export default function OptionData({ data, submitLabel }) {
    const OptionDataStyled = styled.div`
        display: flex;
        flex-flow: column wrap;
        align-items: center;
        .info {
            display: flex;
            flex-flow: column wrap;
            align-items: center;
            margin-top: 20px; 
            width: 100%;
            .dataDiv {
                width: 98%;
                background: #11162f;
                display: flex;
                flex-flow: row wrap;
                justify-content: space-between;
                margin-top: 3px;
                padding: 10px;
                font-size: 14px;
            }
        }
        .locateButton {
            padding: 10px;
            border-radius: 20px;
            width: 95%;
            margin-top: 15px;
            background: #2a3faa;
            border: none;
            color: white;
            font-size: 16px;
            cursor: pointer;
            transition: 300ms all;
        }
        .locateButton:hover {
            background: #1b2b7a;
        }
    `

    const handleSubmit = () => {
        window.mp?.trigger('interactionMenu:optionClicked', JSON.stringify(data))
    }

    return (
        <OptionDataStyled>
            <div className="info">
                {
                    Object.keys(data).map(key => {
                        return(
                            <div 
                                className="dataDiv" 
                                key={ key }
                            >
                                <p className="nameInfo" dangerouslySetInnerHTML={{ __html: key }}></p>
                                <p className="infoP" dangerouslySetInnerHTML={{ __html: data[key] }}></p>
                            </div>
                        )
                    })
                }
            </div>

            <button 
                className="locateButton" 
                dangerouslySetInnerHTML={{__html: submitLabel}}
                onClick={ handleSubmit }    
            ></button>
        </OptionDataStyled>
    )
}