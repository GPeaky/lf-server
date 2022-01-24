mp.events.add("entityCreated", entity => {
    switch (entity.type) {
        case 'vehicle':
                
            entity.getSpeed = () => {
                let velocity = entity.velocity; velocity = Math.sqrt((velocity.x * velocity.x) + (velocity.y * velocity.y) + (velocity.z * velocity.z)) * 3.6
                return velocity;
            }


            break;
        default:
            break;
    }
});