/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require('fs');
const version = require('./package.json').version;

const environmentFilePath = 'src/environments/environment.ts';

const environmentFileContent = fs.readFileSync(environmentFilePath, 'utf-8');

const updatedEnvironmentFileContent = environmentFileContent.replace(
  /version: '(.*)'/,
  `version: '${version}'`
);

fs.writeFileSync(environmentFilePath, updatedEnvironmentFileContent, 'utf-8');

const environmentFilePathProd = 'src/environments/environment.prod.ts';

const environmentFileContentProd = fs.readFileSync(
  environmentFilePathProd,
  'utf-8'
);

const updatedEnvironmentFileContentProd = environmentFileContentProd.replace(
  /version: '(.*)'/,
  `version: '${version}'`
);

fs.writeFileSync(
  environmentFilePathProd,
  updatedEnvironmentFileContentProd,
  'utf-8'
);
