#!/usr/bin/env node

export async function waitKeyPress() {
    process.stdin.setRawMode(true)
    return new Promise<void>((resolve, reject)=>{
        process.stdin.once('data', () => {
            process.stdin.setRawMode(false)
            resolve()
        });
    })
}

waitKeyPress()
.then(()=>process.exit())
.catch((err)=>process.exit())