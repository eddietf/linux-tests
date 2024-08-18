#!/usr/bin/env node

// import { LinuxInstaller } from './index'

import { printMessage } from "./lib/linux-installer"

export async function configureInstaller() {
    printMessage("CONFIGURING...")
    // const i = new LinuxInstaller()
    // i.post_install_script()
}

configureInstaller()
.then(()=>console.log("Configuration complete."))
.catch((err)=>console.error(err))