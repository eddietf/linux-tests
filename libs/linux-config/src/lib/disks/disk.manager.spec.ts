import { DiskManager } from './disk.manager'

describe('DiskManager', ()=>{
    describe('listAllDisks', ()=>{
        it('Simple Test', async ()=>{
            const mgr = new DiskManager()
            const disks = await mgr.listAllDisks()
            expect(disks).toBeDefined()
            expect(Array.isArray(disks)).toBeTruthy()
            const buffer:string[] = []
            for(const disk of disks) {
                buffer.push(`${disk.name}`)
                if(disk.partitions) {
                    for(const disk of disks) {
                        buffer.push(`     ${disk.name}`)
                    }
                }
            }
            console.log(buffer.join('/n'))
            console.log(disks)
        }, 1000000)
    })
})