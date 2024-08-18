#!/usr/bin/env node

export async function runInstallerDaemon() {
    const interval = setInterval(()=>{
        console.log("Coates Installer Daemon")
    }, 1000)   
}

runInstallerDaemon()
.then(()=>console.log('Coates Installer Daemon exited'))
.catch((err)=>console.error(err))