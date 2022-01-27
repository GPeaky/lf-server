mp.events.add("entityCreated", entity => {
    switch (entity.type) {
        case 'vehicle':
            entity.getSpeed = () => {
                let { velocity } = entity
                velocity = Math.sqrt((velocity.x * velocity.x) + (velocity.y * velocity.y) + (velocity.z * velocity.z)) * 3.6
                return velocity;
            }
            break;
        default:
            break;
    }
});

mp.events.add('Keydown::10', player => {
    if(!player.vehicle) return
    player.vehicle.engine = !player.vehicle.engine
})