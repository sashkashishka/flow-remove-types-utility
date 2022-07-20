import { WalkStream } from './walkStream.mjs';
import { ReadFileStream } from './readFileStream.mjs';
import { RemoveFlowTypesStream } from './removeFlowTypesStream.mjs';
import { PrettierStream } from './prettierStream.mjs';
import { WriteFilesStream } from './writeFilesStream.mjs';

const walkStream = new WalkStream('./spa');
const readFileStream = new ReadFileStream();
const removeFlowTypesStream = new RemoveFlowTypesStream();
const prettierStream = new PrettierStream();
const writeFilesStream = new WriteFilesStream('./flow-free');

walkStream
  .pipe(readFileStream)
  .pipe(removeFlowTypesStream)
  .pipe(prettierStream)
  .pipe(writeFilesStream)
