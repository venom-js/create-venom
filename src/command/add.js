'use strict';
const co = require('co');
const prompt = require('co-prompt');
const tplConfig = require('../../templates.json');
const chalk = require('chalk');
const fs = require('fs');
const log = console.log;
const error = chalk.red;
const exec = require('child_process').exec;
const { logTplList } = require('../utils/utils');

module.exports = () => {
  co(function*() {
    /** @name 打印一些超级酷(S)炫(B)的log */
    log(chalk.black.bgWhite.bold('Hello!\n'));
    log(chalk.keyword('orange')('欢迎使用umi-pro-cli!\n'));
    log(chalk.rgb(123, 45, 67).underline('> 添加模板功能\n'));
    log(chalk.hex('#DEADED').bold('Happy & Joy!\n'));

    /**
     * @name 获取用户的输入
     * @param tplName 模板名称
     * @param gitUrl git url
     * @param branch 分支名
     *  */
    let tplName = yield prompt(chalk.yellow('👉  模板名称: '));
    let gitUrl = yield prompt(chalk.blue('👉  Git Url: '));
    let branch = yield prompt(chalk.green('👉  分支名称: '));

    /** @name 如果模板名称已经存在 */
    if (tplConfig.tplMap[tplName]) {
      log(chalk.red('\n✘  模板名称已经存在'));
      process.exit();
      return;
    }

    /** @name 构造新的模板JSON */
    tplConfig.tplMap[tplName] = {};
    const userProtMap = [
      {
        key: 'gitUrl',
        value: gitUrl,
      },
      {
        key: 'branch',
        value: branch,
      },
    ];
    userProtMap.forEach(item => {
      tplConfig.tplMap[tplName][item.key] = item.value;
    });

    const cmdStr = `cd ${__dirname}/../templates && git clone ${gitUrl}`;
    log('新增模板中...');
    exec(cmdStr, error => {
      if (error) {
        log(error);
        process.exit();
        return;
      }
      updateTemplates();
      log(chalk.green('\n✨  模板新增成功!\n'));
      log(chalk.grey('😁  The last template list is: \n'));
      logTplList();
      process.exit();
    });

    /** @name 更新templates.json */
    function updateTemplates() {
      fs.writeFileSync(__dirname + '/../../templates.json', JSON.stringify(tplConfig), 'utf-8', err => {
        if (err) {
          log(error(`\n ✘  ${err}`));
          process.exit();
          return;
        }
      });
    }
  });
};
