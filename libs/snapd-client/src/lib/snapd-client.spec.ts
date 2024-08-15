import { SnapDClient } from './snapd-client';

describe('SnapDClientConfig', () => {
  it('request', async () => {
    const snapd = new SnapDClient() 
    const ret = await snapd.request('system', 'POST')
    expect(ret.success).toBeTruthy();
  });
});
