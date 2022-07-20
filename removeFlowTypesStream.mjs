import { Transform } from 'stream';
import flowRemoveTypes from 'flow-remove-types';
import path from 'path';

export class RemoveFlowTypesStream extends Transform {
  constructor() {
    super({ objectMode: true });
  }

  _transform(data, encoding, cb) {
    if (!data.file || !this.isJS(data.path)) {
      this.push(data);
      return cb();
    }

    try {
      const f = flowRemoveTypes(data.file, { all: true, pretty: true });
      data.file = f.toString();

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
