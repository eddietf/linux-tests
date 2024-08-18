#!/usr/bin/env node

// import { LinuxInstaller } from './index'

export async function runInstaller() {
    console.log("Running Coates Installer...")
    // const i = new LinuxInstaller()
    // i.post_install_script()
}

runInstaller()
.then(()=>console.log("Install complete."))
.catch((err)=>console.error(err))