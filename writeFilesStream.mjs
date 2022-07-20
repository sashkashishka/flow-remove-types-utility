import { Writable } from 'stream';
import fs from 'fs-extra';
import path from 'path';

export class WriteFilesStream extends Writable {
  constructor(outputDir) {
    super({ objectMode: true });

    this.outputDir = outputDir;
  }

  _write(data, encoding, cb) {
    if (!data.file) {
      return cb();
    }

    const outputPath = data.path.replace(
      data.root,
      path.resolve(this.outputDir),
    );

    fs.outputFile(outputPath, data.file, (err) => {
      if (err) {
        return this.emit('error', err);
      }

      console.log(`File ${data.path.replace(data.root, '')} written succesfully!`);
      cb();
    });
  }
}

