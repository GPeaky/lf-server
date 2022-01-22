const browser = mp.browsers.new('package://Cef/InteractionMenu/index.html');
browser.active = false
mp.core = {}
mp.core.currentMenu = null

mp.events.add({
    'interactionMenu:closeMenu': () => {
        browser.active = false 
        mp.core.currentMenu = null
        browser.call('interactionMenu:hideMenu')

        mp.gui.cursor.show(false, false)
    },

    'interactionMenu:optionSelected': option => {
        if ( !mp?.core?.currentMenu?.callbacks?.optionSelected ) return
        mp.core.currentMenu.callbacks.optionSelected(option)
    },

    'interactionMenu:optionClicked': option => {
        mp.gui.cursor.show(false, false)
        mp.gui.chat.push(`Option Clicked: ${option}`)
    }
})

mp.core.Menu = class {
    constructor( title, options ) {
        this.title = title
        this.options = options
        this.callbacks = {}
        mp.core.currentMenu = this
        this.show()
    }

    show() {
        browser.active = true
        browser.call('interactionMenu:setData', this.title, JSON.stringify(this.options))

        setTimeout(() => mp.gui.cursor.show(true, true), 5)
    }

    hide() {
        mp.events.call('interactionMenu:closeMenu')
    }

    update( options ) {
        this.options = options
        browser.call('interactionMenu:updateMenu', this.title, JSON.stringify(this.options))

        setTimeout(() => {
            mp.gui.cursor.show(true, true)
        }, 5)
    }

    on( event, callback ) {
        switch (event) {
            case 'optionSelected':
                this.callbacks.optionSelected = callback
                break;
            default:
                break;
        }
    }
}