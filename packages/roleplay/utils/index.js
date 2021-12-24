mp.utils = {}

// Wait
mp.utils.wait = async(ms) => new Promise((resolve) => setTimeout(resolve, ms));

// NumberPlate 
require('./NumberPlate');