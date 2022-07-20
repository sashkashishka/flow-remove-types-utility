import { Transform } from 'stream';
import fs from 'fs';

export class ReadFileStream extends Transform {
  constructor() {
    super({ objectMode: true });
  }

  _transform(data, encoding, cb) {
    const item = {
      path: data.path,
      root: data.root,
      file: undefined,
    };

    if (data.stats.isDirectory()) {
      this.push(item);
      return cb();
    }

    fs.readFile(data.path, 'utf8', (err, file) => {
      if (err) {
        return this.emit('error', err);
      }

      item.file = file;

      this.push(item);
      cb();
    });

  }
}
