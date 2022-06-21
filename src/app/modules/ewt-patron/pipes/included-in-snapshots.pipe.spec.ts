import { IncludedInSnapshotsPipe } from './included-in-snapshots.pipe';

describe('CongratulationsPipe', () => {
  let pipe: IncludedInSnapshotsPipe;

  beforeEach(() => {
    pipe = new IncludedInSnapshotsPipe();
  })
  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return text about including in one snapshot', () => {
    expect(pipe.transform([0])).toBe("You're included in snapshot 1");
  })

  it('should return text about not included in any snapshot', () => {
    expect(pipe.transform([])).toBe("You're not included in any snapshot");
  });

  it('should return text about included in 2 snapshots', () => {
    expect(pipe.transform([0, 1])).toBe("You're included in snapshot 1 and 2");
  });

  it('should return text about included in 3 snapshots', () => {
    expect(pipe.transform([0, 1, 2])).toBe("You're included in snapshot 1, 2 and 3");
  });
});
