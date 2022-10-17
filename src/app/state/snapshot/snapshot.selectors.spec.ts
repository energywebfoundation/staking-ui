import { canDisplayNFTSection } from './snapshot.selectors';

describe('Snapshot Selectors', () => {
  describe('canDisplayNFTSection', () =>  {
    it('should return false, when acceptedSnapshots do not fits', () => {
      expect(
        canDisplayNFTSection.projector(
          ['snapshot1'],
          [{ roleName: 'snapshot2' }]
        )
      ).toBeFalse();
    });

    it('should return false, when accepted snapshots do not contains 4', () => {
      const snapshotRoles = ['snapshot1','snapshot2','snapshot3','snapshot5']
      expect(
        canDisplayNFTSection.projector(
          [...snapshotRoles, 'snapshot4'],
          [...snapshotRoles.map((role) => ({roleName: role}))]
        )
      ).toBeFalse();
    });

    it('should return true, when user contains required snapshots', () => {
      const snapshotRoles = ['snapshot1','snapshot2','snapshot3','snapshot4']
      expect(
        canDisplayNFTSection.projector(
          [...snapshotRoles],
          [...snapshotRoles.map((role) => ({roleName: role}))]
        )
      ).toBeTrue();
    })

  });
});
