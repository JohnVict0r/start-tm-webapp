import { fixedZero, isUrl, getRouteAuthority } from './utils';

describe('fixedZero tests', () => {
  it('should not pad large numbers', () => {
    expect(fixedZero(10)).toEqual(10);
    expect(fixedZero(11)).toEqual(11);
    expect(fixedZero(15)).toEqual(15);
    expect(fixedZero(20)).toEqual(20);
    expect(fixedZero(100)).toEqual(100);
    expect(fixedZero(1000)).toEqual(1000);
  });

  it('should pad single digit numbers and return them as string', () => {
    expect(fixedZero(0)).toEqual('00');
    expect(fixedZero(1)).toEqual('01');
    expect(fixedZero(2)).toEqual('02');
    expect(fixedZero(3)).toEqual('03');
    expect(fixedZero(4)).toEqual('04');
    expect(fixedZero(5)).toEqual('05');
    expect(fixedZero(6)).toEqual('06');
    expect(fixedZero(7)).toEqual('07');
    expect(fixedZero(8)).toEqual('08');
    expect(fixedZero(9)).toEqual('09');
  });
});

describe('isUrl tests', () => {
  it('should return false for invalid and corner case inputs', () => {
    expect(isUrl([])).toBeFalsy();
    expect(isUrl({})).toBeFalsy();
    expect(isUrl(false)).toBeFalsy();
    expect(isUrl(true)).toBeFalsy();
    expect(isUrl(NaN)).toBeFalsy();
    expect(isUrl(null)).toBeFalsy();
    expect(isUrl(undefined)).toBeFalsy();
    expect(isUrl()).toBeFalsy();
    expect(isUrl('')).toBeFalsy();
  });

  it('should return false for invalid URLs', () => {
    expect(isUrl('foo')).toBeFalsy();
    expect(isUrl('bar')).toBeFalsy();
    expect(isUrl('bar/test')).toBeFalsy();
    expect(isUrl('http:/example.com/')).toBeFalsy();
    expect(isUrl('ttp://example.com/')).toBeFalsy();
  });

  it('should return true for valid URLs', () => {
    expect(isUrl('http://example.com/')).toBeTruthy();
    expect(isUrl('https://example.com/')).toBeTruthy();
    expect(isUrl('http://example.com/test/123')).toBeTruthy();
    expect(isUrl('https://example.com/test/123')).toBeTruthy();
    expect(isUrl('http://example.com/test/123?foo=bar')).toBeTruthy();
    expect(isUrl('https://example.com/test/123?foo=bar')).toBeTruthy();
    expect(isUrl('http://www.example.com/')).toBeTruthy();
    expect(isUrl('https://www.example.com/')).toBeTruthy();
    expect(isUrl('http://www.example.com/test/123')).toBeTruthy();
    expect(isUrl('https://www.example.com/test/123')).toBeTruthy();
    expect(isUrl('http://www.example.com/test/123?foo=bar')).toBeTruthy();
    expect(isUrl('https://www.example.com/test/123?foo=bar')).toBeTruthy();
  });
});

describe('getRouteAuthority tests', () => {
  const routes = [
    {
      path: '/',
      routes: [
        {
          path: '/a',
          authority: ['r1'],
          routes: [
            { path: '/a/a' },
            { path: '/a/b', authority: ['r1.1'] },
            {
              path: '/a/:route',
              authority: ['r1.2'],
              routes: [
                { path: '/a/:route/a', authority: ['r1.2.1', 'r1.2.2'] },
                { path: '/a/:route/b' },
                { path: '/a/:route/c', authority: [] },
              ],
            },
          ],
        },
      ],
    },
  ];

  it('should return the route authority', () => {
    expect(getRouteAuthority('/', routes)).toBeUndefined();
    expect(getRouteAuthority('/a', routes)).toEqual(['r1']);
    expect(getRouteAuthority('/a/a', routes)).toEqual(['r1']);
    expect(getRouteAuthority('/a/b', routes)).toEqual(['r1.1']);
    expect(getRouteAuthority('/a/123', routes)).toEqual(['r1.2']);
    expect(getRouteAuthority('/a/123/a', routes)).toEqual(['r1.2.1', 'r1.2.2']);
    expect(getRouteAuthority('/a/123/b', routes)).toEqual(['r1.2']);
    expect(getRouteAuthority('/a/123/c', routes)).toEqual([]);
  });
});
