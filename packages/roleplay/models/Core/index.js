mp.core = {}

mp.core.wait = async(ms) => new Promise((resolve) => setTimeout(resolve, ms));