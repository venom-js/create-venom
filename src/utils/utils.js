const fs = require("fs");

/**
 * @name 获取模板列表
 */
function getTplLists() {
  return fs
    .readdirSync(__dirname + "/../templates")
    .filter(item2 => item2 !== ".DS_Store")
    .map(item => ({
      name: item,
      value: item
    }));
}

/**
 * @name 打印当前模板列表
 */
function logTplList() {
  getTplLists().forEach(item => {
    console.log(`∘ ${item.name}`);
  });
}

/**
 * @name 复制文件夹
 */
function copyFolder(from, to, venomConfig) {
  if (fs.existsSync(to)) {
    const files = fs.readdirSync(from);
    files.forEach(file => {
      const fromPath = `${from}/${file}`;
      const toPath = `${to}/${file}`;
      if (fs.statSync(fromPath).isDirectory()) {
        copyFolder(fromPath, toPath, venomConfig);
        return;
      }
      if (file === "venom.config.ts") {
        const newVenomConfig = `import{VenomBasicConfig}from'./types/venom';const venomBasicConfig:VenomBasicConfig=${venomConfig};export default venomBasicConfig;`;
        fs.writeFileSync(toPath, newVenomConfig);
        return;
      }
      fs.copyFileSync(fromPath, toPath);
    });
  } else {
    fs.mkdirSync(to);
    copyFolder(from, to, venomConfig);
  }
  return true;
}

module.exports = { getTplLists, copyFolder, logTplList };
