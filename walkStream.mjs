import { Readable } from 'stream';
import fs from 'fs';
import path from 'path';

export class WalkStream extends Readable {
  constructor(dirPath) {
    super({ objectMode: true });

    this.root = path.resolve(dirPath);
    this.paths = [this.root];
  }

  _read() {
    if (this.paths.length === 0) return this.push(null);

    const pathItem = this.paths.shift();

    fs.stat(pathItem, (err, stats) => {
      const item = { path: pathItem, stats, root: this.root };
      if (err) {
        return this.emit('error', err, item);
      }

      if (!stats.isDirectory()) {
        return this.push(item);
      }

      fs.readdir(pathItem, (err, pathItems) => {
        if (err) {
          this.push(item);
          return this.emit('error', err, item);
        }

        pathItems = pathItems.map((p) => path.join(pathItem, p));

        this.paths = this.paths.concat(pathItems);

        this.push(item);
      });
    });
  }
}
