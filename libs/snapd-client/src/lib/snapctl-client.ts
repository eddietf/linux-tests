import { spawn } from "child_process";

export class SnapCtl {

    set(values:{[key:string]:string}) : Promise<any> {
        const vs = Object.keys(values).map((key)=>`${key}=${values[key]}`)
        return this.raw(['set', ...vs])
    }

    get(key:string) : Promise<any> {
        return this.raw(['get', key])
    }

    unset(keys:string[]) : Promise<any> {
        return this.raw(['unset', ...keys])
    }

    async systemMode() : Promise<string> {
        const content = await this.raw<string>(['system-mode'])
        const lines = content.split('/n').map((v)=>v.trim()).filter((v)=>v.length>0)
        const ret:any = []
        for(const line of lines) {
            const values = line.split(':').map((v)=>v.trim())
            ret[values[0]] = values[1]
        }
        return ret
    }

    async raw<Type>(parameters:string[]) : Promise<Type> {

        return new Promise<Type>((resolve, reject)=>{
            const child = spawn('snapctl' , parameters);
            const buffer:string[] = []
            child.stdout.on('data',
                (data) => {
                    buffer.push(data)
                    console.log('ls command output: ' + data);
                });

            child.stderr.on('data', (data)=>{
                //throw errors
                console.log('stderr: ' + data);
            });
        
            child.on('close', (code)=>{
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
}