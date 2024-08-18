import { spawn } from "child_process";
import { DiskInformation } from "./disk.types";

export interface LSBLKResult {
    code: number
    data: string
}

export class DiskManager {

    async listAllDisks() : Promise<DiskInformation[]> {
        const data = await this.raw(['-l', '--json', '--output-all'])
        const obj = JSON.parse(data.data)

        console.log(`Returned ${obj.blockdevices.length}`)

        for(const key of obj)
            console.log(key)
        
        const ret:DiskInformation[] = []

        const partitions = new Map<string, any[]>()
        for(const block of obj.blockdevices) {
            if(block.type=='disk') {
                // for(const key in obj) {

                // }        
                ret.push(block)
            }
            else if(block.type=='part') {
                let diskParts = partitions.get(block.kname)
                if(!diskParts) {
                    diskParts = []
                    partitions.set(block.kname, diskParts)
                }
                diskParts.push(block) 
            }
        }

        for(const disk of ret) {
            if(partitions.has(disk.name))
                disk.partitions = <any>partitions.get(disk.name)
        }

        return ret
    }


    async raw(parameters:string[]) : Promise<LSBLKResult> {

        return new Promise<LSBLKResult>((resolve, reject)=>{

            const args = parameters.includes('--json') ? parameters : [...parameters, '--json']
            const child = spawn('lsblk' , args);
            
            const buffer:string[] = []
            
            child.stdout.on('data',
                (data) => {
                    buffer.push(data)
                    console.log('lsblk command output: ' + data);
                });

            child.stderr.on('data', (data)=>{
                //throw errors
                console.log('stderr: ' + data);
            });
        
            child.on('close', (code)=>{
                console.log('child process exited with code ' + code);
                if(code!=0) {
                    reject(`lsblk returned ${code}`)
                }
                else  {
                    const result = buffer.join()
                    resolve({
                        code,
                        data: buffer.toString()
                    })
                }

            });
        })
    }
}