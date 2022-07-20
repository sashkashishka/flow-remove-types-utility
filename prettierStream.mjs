import { Transform } from 'stream';
import path from 'path';
import prettier from 'prettier';

export class PrettierStream extends Transform {
  constructor() {
    super({ objectMode: true });
  }

  _transform(data, encoding, cb) {
    if (!data.file || !this.isJS(data.path)) {
      this.push(data);
      return cb();
    }

    try {
      data.file = prettier.format(data.file, {
        printWidth: 120,
        tabWidth: 2,
        singleQuote: true,
        trailingComma: 'all',
        arrowParens: 'avoid',
        singleAttributePerLine: true,
        parser: 'babel',
      });

      this.push(data);
    } catch (e) {
      this.emit('error', e);
    } finally {
      return cb();
    }
  }

  isJS(filePath) {
    const extension = path.extname(filePath);

    return extension === '.js' || extension === '.jsx'; 
  }
}
