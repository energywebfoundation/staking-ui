import { ImagePathPipe } from './image-path.pipe';

describe('ImagePipe', () => {
  it('create an instance', () => {
    const pipe = new ImagePathPipe();
    expect(pipe).toBeTruthy();
  });
});
