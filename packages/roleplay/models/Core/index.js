mp.core = {}

mp.core.wait = async(time => { return new Promise(resolve => setTimeout(resolve, time))})