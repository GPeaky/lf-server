import Option from '../Option'
import { useState } from 'react'
import MenuStyled from './MenuStyled'

export default function MenuSlider () {
    const [{ title, options }, setData] = useState({
        title: 'Default Title',
        options: []
    })

    window.mp?.events.add('interactionMenu:setData', (title, options) => {
        setData({
            title, 
            options: JSON.parse(options)
        })
    })

    window.mp?.events.add('interactionMenu:updateMenu', (title, options) => {
        setData({ 
            title,
            options: JSON.parse(options)  
        })
    })

    window.mp?.events.add('interactionMenu:hideMenu', () => {
        setData({ 
            title: 'Default title', 
            options: [] 
        })
    })

    window.addEventListener('keydown', event => {
        if (event.keyCode === 27) window.mp?.trigger('interactionMenu:closeMenu')
    })

    return(
        <MenuStyled>
            <div className="title">
                <h1 className="titleMenu" dangerouslySetInnerHTML={{__html: title}}></h1>
                <button 
                    className="buttonMenu"
                    onClick={
                        () => window.mp?.trigger('interactionMenu:closeMenu')
                    }
                >X</button>
            </div>
            <div className="options">
                {
                    options.map(({ value: key, label: title, description, dataOption, options }, index) => {
                        return (
                            <Option 
                                key={ key }
                                title={ title }
                                options={ options }
                                numberOption={ index }
                                dataOption={ dataOption }
                                description={ description }
                            />
                        )
                    })
                }
            </div>
        </MenuStyled>
    )
}