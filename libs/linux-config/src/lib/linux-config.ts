import { SnapDClient } from "@coates/snapd-client"
import { DiskManager } from "./disks/disk.manager"

export class LinuxConfigurator {

  dm?:DiskManager
  snapd:SnapDClient

  constructor() {
    this.snapd = new SnapDClient()
  }

  getDiskManager() : DiskManager {
    if(!this.dm)
      this.dm = new DiskManager()
    return this.dm
  }

  verifySystemDServices() {
    console.log('Checking if we have coates snaps installed')
    if(this.snapd.hasSnapWithId('coates-conf')) {
      console.log("Configuring system")
    }
  }
}