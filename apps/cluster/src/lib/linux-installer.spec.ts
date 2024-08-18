import { linuxInstaller } from './linux-installer';

describe('linuxInstaller', () => {
  it('should work', () => {
    expect(linuxInstaller()).toEqual('linux-installer');
  });
});
