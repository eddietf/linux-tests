import * as http from 'http'

export interface SnapDResponse<Type = 'string' | Buffer> {
  success: boolean
  status: number
  body?: Type
}

export interface SnapDClientConfig {
  version:number
  port:number
}

const defaultConfig:SnapDClientConfig = {
  version: 2,
  port: 80
}

export class SnapDClient {

  config:SnapDClientConfig

  constructor(config?:SnapDClientConfig) {
    this.config = {...defaultConfig, ...(config??{})}
  }

  listCurrentSnaps(): string[] {
    return []
  }

  hasSnapWithId(id: string): boolean {
    return true
  }

  listRecoverySystems() : Promise<any>{
    const ret = this.getJSON('systems')
    console.log(ret)
    return ret
  }

  async getJSON<Type>(url: string) : Promise<SnapDResponse<Type>> {
    const ret = await this.get(url)
    if(ret.success && ret.body) {
      const obj = JSON.parse(ret.body.toString())
      return <SnapDResponse<Type>>{...ret, body: obj}
    }
    return <SnapDResponse<Type>>{...ret, body: null}
  }

  get(url: string): Promise<SnapDResponse> {
    return this.request(url, 'GET')
  }

  post(url: string): Promise<SnapDResponse> {
    return this.request(url, 'POST')
  }

  request(url: string, method: 'GET' | 'POST'): Promise<SnapDResponse> {

    const options = {
      socketPath: '/run/snapd.socket',
      host: 'localhost',
      port: this.config.port,
      path: `v${this.config.version}/${url}`,
      method,
      headers: {
        'Content-Type': 'application/json'
      }
    };


    return new Promise<SnapDResponse>((resolve, reject) => {
      const output: Buffer[] = [];
      const req = http.request(options, (res) => {
        console.log(`${options.host} : ${res.statusCode}`);
        res.setEncoding('utf8');

        res.on('data', (chunk) => {
          output.push(chunk);
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

      req.end();
    });

  }

}