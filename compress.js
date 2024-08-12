"use strict";
exports.__esModule = true;
var child_process_1 = require("child_process");
var path = require("path");
// Função para verificar se o 7-Zip está instalado
function is7ZipInstalled() {
  try {
    (0, child_process_1.execSync)('7z', { stdio: 'ignore' });
    return true;
  }
  catch (_a) {
    return false;
  }
}
// Função para exibir instruções de instalação
function showInstallationInstructions() {
  var platform = process.platform;
  console.error('\x1b[1m\x1b[31m7-Zip não encontrado.\x1b[0m\n');
  switch (platform) {
    case 'win32':
      console.error('No Windows, use o seguinte comando para instalar via winget:');
      console.error('winget install 7zip.7zip');
      break;
    case 'linux':
      console.error('No Linux, use o seguinte comando para instalar:');
      console.error('sudo apt-get install p7zip-full');
      break;
    case 'darwin':
      console.error('No macOS, use o seguinte comando para instalar via Homebrew:');
      console.error('brew install p7zip');
      break;
    default:
      console.error('Sistema operacional não reconhecido. Instale o 7-Zip manualmente.');
  }
  console.error();
  process.exit(1);
}
// Função para comprimir usando o 7-Zip
function compressWith7Zip(outputFilename) {
  (0, child_process_1.execSync)("7z a ".concat(outputFilename, " dist"), { stdio: 'inherit' });
  // Exibir mensagem de sucesso verde e em negrito
  console.info('\n\x1b[1m\x1b[32mPasta dist comprimida com sucesso:', outputFilename, '\x1b[0m');
}
// Verificar se o 7-Zip está instalado
if (!is7ZipInstalled()) {
  showInstallationInstructions();
}
// Verificar se a pasta dist existe
else if (!require('fs').existsSync('dist')) {
  console.error('\x1b[1m\x1b[31mPasta dist não encontrada. Execute "npm run build" para buildar e comprimir.\x1b[0m\n');
}
else {
  // Obtém o nome do diretório atual como o nome do projeto
  var projectName = path.basename(process.cwd());
  // Obtém a data atual em formato ISO
  var dateIso = new Date().toISOString().replace(/:/g, '-').split('.')[0]; // Substitui ':' por '-' para compatibilidade com o sistema de arquivos
  // Define o nome do arquivo comprimido
  var outputFilename = 'dist_' + projectName + '_' + dateIso + '.zip';
  // Comprime a pasta dist e renomeia
  try {
    compressWith7Zip(outputFilename);
  }
  catch (error) {
    // Em vermelho e em negrito
    console.error('\n\x1b[1m\x1b[31mErro ao comprimir a pasta dist:', error, '\x1b[0m\n');
  }
}
