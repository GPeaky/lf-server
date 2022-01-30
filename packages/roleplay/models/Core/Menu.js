mp.events.add({
    'interactionMenu:menuClosed': (player) => {
        if (!player?.currentMenu?.callbacks?.menuClosed) return player.currentMenu = null
        player?.currentMenu?.callbacks?.menuClosed()
        player.currentMenu = null
    },
    
    'interactionMenu:optionSelected': (player, optionData) => {
        if (!player?.currentMenu?.callbacks?.optionSelected) return
        player?.currentMenu?.callbacks?.optionSelected(JSON.parse(optionData))
    },
    
    'interactionMenu:optionClicked': (player, optionData) => {
        if (!player?.currentMenu?.callbacks?.optionClicked) return
        player?.currentMenu?.callbacks?.optionClicked(JSON.parse(optionData))
    }
})

mp.core.Menu = class {
    constructor( player, title, options, internal = false ) {
        this.title = title
        this.player = player
        this.options = options
        this.internal = internal
        this.callbacks = {}
        player.currentMenu = this
        if (!internal) this.show()
    }

    show() {
        this.player.call('interactionMenu:openMenu', [this.title, this.options])
    }
    
    close() {
        this.player.call('interactionMenu:closeMenu')
    }

    on( event, callback ) {
        switch (event) {
            case 'optionSelected':
                this.callbacks.optionSelected = callback
                break;
            case 'optionClicked':
                this.callbacks.optionClicked = callback
                break;
            case 'menuClosed':
                this.callbacks.menuClosed = callback
                break;
            default:
                break;
        }
    }
}