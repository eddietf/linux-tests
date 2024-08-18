#!/usr/bin/env node

// import { LinuxInstaller } from './index'

import yargs from "yargs"

import { printMessage } from "./lib/linux-installer"

export class CoatesLinuxInstaller {



}
export async function runInstaller() {
    printMessage("Running Coates Installer...")

    console.log(process.argv)

    const argv = yargs(hideBin(process.argv))
    .command


    // const i = new LinuxInstaller()
    // i.post_install_script()
}

runInstaller()
.then(()=>console.log("Install complete."))
.catch((err)=>console.error(err))