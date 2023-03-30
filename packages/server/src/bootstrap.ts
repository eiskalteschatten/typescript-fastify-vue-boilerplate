import fs from 'fs';
import path from 'path';

import tsconfig from '../tsconfig.json';

import logger from './lib/logger';

const { outDir, baseUrl, paths } = tsconfig.compilerOptions;

async function setupSymlinks(): Promise<void> {
  logger.info('Setting up symlinks');

  for (let alias in paths) {
    const sources = paths[alias];
    const isDir = alias.slice(-1) === '*';

    alias = alias.replace('*', '');

    const firstPartOfAlias = './node_modules';
    const fullAlias = path.resolve(firstPartOfAlias, alias);

    if (!fs.existsSync(firstPartOfAlias)) {
      fs.mkdirSync(firstPartOfAlias);
    }

    for (let source of sources) {
      source = source.replace('*', '');
      let sourcePath = path.resolve(outDir, baseUrl, source);

      if (!isDir) {
        sourcePath += '.js';
      }

      logger.info('- ' + fullAlias + ' -> ' + sourcePath);

      try {
        fs.symlinkSync(sourcePath, fullAlias);
      }
      catch (error) {
        logger.error(error);
      }
    }
  }

  logger.info('Symlinks created successfully');
}

setupSymlinks();
