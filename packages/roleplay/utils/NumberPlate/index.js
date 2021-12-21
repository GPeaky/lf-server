mp.utils.generateNumberPlate = () => {
    let numberPlate = '';
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890';

    for (let i = 0; i <= 8; i++) {
        numberPlate += letters[Math.floor(Math.random() * letters.length)];
    }

    return numberPlate
}