import { linuxConfig } from './linux-config';

describe('linuxConfig', () => {
  it('should work', () => {
    expect(linuxConfig()).toEqual('linux-config');
  });
});
