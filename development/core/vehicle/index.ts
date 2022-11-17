mp.events.add('entityCreated', (entity) => {
    if (entity?.type !== 'vehicle') return;

    entity.getSpeed = () => {
        // @ts-expect-error
        const {velocity} = entity;
        return (
            Math.sqrt(
                velocity.x * velocity.x +
                    velocity.y * velocity.y +
                    velocity.z * velocity.z,
            ) * 3.6
        );
    };
});

mp.events.add('Keydown::10', (player) => {
    if (!player.vehicle) return;
    player.vehicle.engine = !player.vehicle.engine;
});
