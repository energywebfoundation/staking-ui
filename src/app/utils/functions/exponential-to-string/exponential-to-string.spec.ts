import { exponentialToString } from './exponential-to-string';

describe('exponentialToString function', () => {
  it('should parse 1', () => {
    expect(exponentialToString(1)).toEqual('1');
  });

  it('should parse 0', () => {
    expect(exponentialToString('0')).toEqual('0');
  });

  it('should parse 0.001', () => {
    expect(exponentialToString('0.001')).toEqual('0.001');
  });

  it('should parse 1e-9', () => {
    expect(exponentialToString('1e-9')).toEqual('0.000000001');
  });

  it('should parse 2e-10', () => {
    expect(exponentialToString('2e-10')).toEqual('0.0000000002');
  });

  it('should parse 1e-18', () => {
    expect(exponentialToString('1e-18')).toEqual('0.000000000000000001');
  });
});
