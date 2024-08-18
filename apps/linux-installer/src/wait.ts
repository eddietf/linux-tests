#!/usr/bin/env node

import { printMessage } from "./lib/linux-installer";

export async function waitKeyPress() {
    printMessage('Press a key to continue')
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