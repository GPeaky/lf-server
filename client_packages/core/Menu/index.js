const browser = mp.browsers.new('package://Cef/InteractionMenu/index.html');
browser.active = false
mp.core = {}

mp.events.add({
    'interactionMenu:closeMenu': () => {
        browser.active = false 
        browser.call('interactionMenu:hideMenu')

        setTimeout(() => {
            mp.gui.cursor.show(false, false)
        }, 5)
    },

    'interactionMenu:optionSelected': option => {
        mp.console.logInfo(option, true, true)
    } 
})

mp.core.Menu = class {
    constructor( title, options ) {
        this.title = title
        this.options = options
        this.show()
    }

    show() {
        browser.active = true
        browser.call('interactionMenu:setData', this.title, JSON.stringify(this.options))

        setTimeout(() => {
            mp.gui.cursor.show(true, true)
        }, 5)
    }

    hide() {
        browser.active = false
        browser.call('interactionMenu:hideMenu')

        setTimeout(() => {
            mp.gui.cursor.show(false, false)
        }, 5)
    }

    update( options ) {
        this.options = options
        browser.call('interactionMenu:updateMenu', this.title, JSON.stringify(this.options))

        setTimeout(() => {
            mp.gui.cursor.show(true, true)
        }, 5)
    }

    // on( event, callback ) {
    // }
}