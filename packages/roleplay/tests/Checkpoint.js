//* You can run this file to test your code.

// Checkpoint
mp.events.addCommand('TestCheckpoint', player => {
    const Checkpoint = new mp.core.Checkpoints(1, player.position, 5, new mp.Vector3(0, 0, 0), [255, 0, 0, 255], true, 0)
})