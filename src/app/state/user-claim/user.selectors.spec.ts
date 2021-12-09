import * as userSelectors from './user.selectors';

describe('User Selectors', () => {

  describe('did document', () => {
    it('should return undefined when passing empty state object', () => {
      expect(userSelectors.getDid.projector({})).toBeUndefined();
    });

    it('should return undefined when passing empty did document object', () => {
      expect(userSelectors.getDid.projector({didDocument: {}})).toBeUndefined();
    });

    it('should return id of specified did document', () => {
      expect(userSelectors.getDid.projector({didDocument: {id: 'test'}})).toEqual('test');
    });
  });

});
