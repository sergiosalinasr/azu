// scripts/sync-version.js
const fs = require('fs');
const packageJson = require('../../package.json');
const environmentFilesDirectory = 'src/environments/';
const appVersion = packageJson.version;

const replaceVersion = (filePath) => {
  const environmentFileContent = `export const environment = {
  production: ${filePath.includes('.prod')},
  appVersion: '${appVersion}'
};\n`;
  fs.writeFileSync(filePath, environmentFileContent, { encoding: 'utf8' });
};

replaceVersion(environmentFilesDirectory + 'environment.ts');
replaceVersion(environmentFilesDirectory + 'environment.prod.ts');
