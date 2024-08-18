import { spawn } from "child_process"
import { platform, release, type } from 'os'

export function runSnapcraft() {

    return new Promise<void>((resolve, reject)=>{
        
        console.log(`Running snapcraft [${platform()}] ${type()} ${release()}`)

        if(platform()!='linux')
            throw new Error(`This command is only valid in linux, you are using ${platform()}`)

        const process = spawn('/snap/bin/snapcraft', {
            cwd: ''
        })

        const buffer:string[] = []
        
        process.stdout.on('data',
            (data) => {
                buffer.push(data)
                console.log('ls command output: ' + data);
            });

        process.stderr.on('data', (data)=>{
            //throw errors
            console.log('stderr: ' + data);
        });
    
        process.on('close', (code)=>{
            console.log('child process exited with code ' + code);
            if(code!=0) {
                reject(`snapctl returned ${code}`)
            }
            else  {
                const result = buffer.join()
                const ret = JSON.parse(result)
                resolve(ret)
            }

        });
    })
}

runSnapcraft()
.then(()=>console.log('Done'))
.catch((err)=>console.error(err))