import chokidar from 'chokidar'
import { execFile } from "node:child_process";

const watcher = chokidar.watch('./packages', {
    ignored: /(^|[\/\\])\../, // ignore dotfiles
    persistent: true
})

watcher.on('change', path => {
    console.log('File', path, 'has been changed')
})

watcher.close().then(() => {
    console.log('Watcher closed')
})

execFile('ragemp-server', (error, stdout, stderr) => {
    if (error) {
        throw error;
    }
    console.log(stdout);
})