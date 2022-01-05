let near = false

mp.events.add("shop:fuel:enter", () => {
    near = true
});

mp.events.add("shop:fuel:exit", ( ) => {
    near = false
});

