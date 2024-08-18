import { SnapDClient } from './snapd-client';

describe('SnapDClientConfig', () => {
  it('request', async () => {
    const snapd = new SnapDClient() 
    let ret:any = await snapd.getSystemInfo()
    console.log(JSON.stringify(ret, null, 2))
    expect(ret).toBeDefined();
    ret = await snapd.listUsers()
    console.log(JSON.stringify(ret, null, 2))
    expect(ret).toBeDefined();
  }, 1000000);
});
