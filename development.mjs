import chokidar from 'chokidar'
import { exec } from "node:child_process"

const ragempProcessName =  process.platform === 'win32' ? 'ragemp-server.exe' : './ragemp-server' 

let restarting = false
let ragemp = exec(ragempProcessName)

const listenExec = exec => {
    exec.stdout.on('data', (data) => {
        process.stdout.write(data)

    })
}

const watcher = chokidar.watch('./packages', {
    ignored: /(^|[\/\\])\../, // ignore dotfiles
    persistent: true
})

listenExec(ragemp)
watcher.on('change', _ => {
    if (!restarting) {
        restarting = true
        
        if (process.platform === 'win32') {
            exec('taskkill /F /IM ragemp-server* /T')
        } else {
            exec('killall ragemp-server')
        }

        console.clear()

        setTimeout(() => {
            ragemp = exec(ragempProcessName)
            setTimeout(() => {
                listenExec(ragemp)
                restarting = false
            }, 0)
        }, 250)
    }
})