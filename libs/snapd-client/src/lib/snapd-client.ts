import * as http from 'http'
import { CreateRecoveryRequest, SnapDClientConfig, SnapDResponse, SnapSystemInfo, SnapUser, SnapWarning } from './snapd.types'

  
const defaultConfig:SnapDClientConfig = {
  version: 2,
  port: 80
}

export class SnapDClient {

  config:SnapDClientConfig

  constructor(config?:SnapDClientConfig) {
    this.config = {...defaultConfig, ...(config??{})}
  }

  getSystemInfo() {
    return this.getJSON<SnapSystemInfo>('system-info')
  }

  /** 
   * get information on user accounts 
   * @return: array of user account information
   * */
  listUsers() {
    return this.getJSON<SnapUser>('users')
  }

  listWarnings() {
    return this.getJSON<SnapWarning[]>('warnings')
  }

  clearWarnings(before?:Date) {
    const timestamp = ''
    return this.postJSON<SnapUser>('warnings', { action: 'okay', timestamp})
  }

  listCurrentSnaps(): string[] {
    return []
  }

  hasSnapWithId(id: string): boolean {
    return true
  }

  async reboot(mode?:string) : Promise<void> {
    await this.post('systems', { action: 'reboot', mode: mode??'run'})
  }

  async doFactorReset() : Promise<void> {
    await this.post('systems', { action: 'reboot', mode:'factory-reset'})
  }

  async doInstall() : Promise<void> {
    await this.post('systems', { action: 'reboot', mode: 'install'})
  }

  async doRecover() : Promise<void> {
    await this.post('systems', { action: 'reboot', mode: 'install'})
  }

  async createRecovery(request:CreateRecoveryRequest) {
    await this.post('systems', { action: 'create', ...request})
  }

  async getJSON<Type>(url: string) : Promise<SnapDResponse<Type>> {
    const ret = await this.get(url)
    if(ret.success && ret.body) {
      const obj = this.toJSON<Type>(ret.body)
      return <SnapDResponse<Type>>{...ret, body: obj}
    }
    return <SnapDResponse<Type>>{...ret, body: null}
  }

  async postJSON<Type, Request = any>(url: string, body:Request) : Promise<SnapDResponse<Type>> {
    const ret = await this.post(url, body)
    if(ret.success && ret.body) {
      const obj = this.toJSON<Type>(ret.body)
      return <SnapDResponse<Type>>{...ret, body: obj}
    }
    return <SnapDResponse<Type>>{...ret, body: null}
  }

  toJSON<Type>(content: Buffer | string) : Type {
    const obj = JSON.parse(content.toString())
    return <Type>obj
  }

  get(url: string): Promise<SnapDResponse> {
    return this.request(url, 'GET')
  }

  post(url: string, body?: any): Promise<SnapDResponse> {
    return this.request(url, 'POST')
  }

  request(url: string, method: 'GET' | 'POST', body?: any): Promise<SnapDResponse> {

    const options = {
      socketPath: '/run/snapd.socket',
      // host: 'localhost',
      // port: this.config.port,
      path: `/v${this.config.version}/${url}`,
      method,
      headers: {
        'Content-Type': 'application/json'
      }
    };


    return new Promise<SnapDResponse>((resolve, reject) => {
      const output: Buffer[] = [];
      const req = http.request(options, (res) => {
        console.log(`${options.socketPath} : ${res.statusCode}`);
        res.setEncoding('utf8');

        res.on('data', (chunk) => {
          output.push(typeof chunk == 'string' ? Buffer.from(chunk) : chunk);
        });

        res.on('end', () => {
          resolve({
            success: true,
            status: 200,
            body: Buffer.concat(output)
          });
        });
      });

      req.on('error', (err) => {
        reject(err);
      });

      if(body) {
        req.write(body)
      }
      req.end();
    });

  }

}