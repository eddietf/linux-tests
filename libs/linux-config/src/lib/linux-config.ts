import { SnapDClient } from "@coates/snapd-client"

export class LinuxConfigurator {

  snapd:SnapDClient

  constructor() {
    this.snapd = new SnapDClient()
  }

  verifySystemDServices() {
    console.log('Checking if we have coates snaps installed')
    if(this.snapd.hasSnapWithId('coates-conf')) {
      console.log("Configuring system")
    }
  }

}