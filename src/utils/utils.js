const fs = require('fs');

/**
 * @name 获取模板列表
 */
function getTplLists() {
  return fs.readdirSync(__dirname + '/../templates').map(item => ({
    name: item,
    value: item,
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
function copyFolder(from, to) {
  if (fs.existsSync(to)) {
    const files = fs.readdirSync(from);
    files.forEach(file => {
      const fromPath = `${from}/${file}`;
      const toPath = `${to}/${file}`;
      if (fs.statSync(fromPath).isDirectory()) {
        copyFolder(fromPath, toPath);
        return;
      }
      fs.copyFileSync(fromPath, toPath);
    });
  } else {
    fs.mkdirSync(to);
    copyFolder(from, to);
  }
  return true;
}

module.exports = { getTplLists, copyFolder, logTplList };
