import { LinuxConfigurator } from "@coates/linux-config";


export class LinuxInstaller {

  configurator:LinuxConfigurator

  constructor() {
    this.configurator = new LinuxConfigurator()
  }

  post_install_script() {
    this.configurator.verifySystemDServices()
  }

}


export function printMessage(message:string) {
  while(message.length<82)
    message = ` ${message} `

  console.log("")
  console.log("")
  console.log("**********************************************************************************")
  console.log("*                                                                                *")
  console.log(message)
  console.log("*                                                                                *")
  console.log("**********************************************************************************")
  console.log("")
  console.log("")
}