'use strict';
const tplConfig = require('../../templates.json');
const co = require('co');
const chalk = require('chalk');
const fs = require('fs');
const log = console.log;
const error = chalk.red;
const inquirer = require('inquirer');
const exec = require('child_process').exec;
const { getTplLists, logTplList } = require('../utils/utils');

const checkPrompt = [
  {
    name: 'tplName',
    message: 'Please select the template you want to delete? 😁',
    type: 'list',
    choices: getTplLists(),
  },
];

module.exports = () => {
  co(function*() {
    /** @name 打印一些超级酷(S)炫(B)的log */
    log(chalk.black.bgWhite.bold('Hello!\n'));
    log(chalk.keyword('orange')('欢迎使用umi-pro-cli!\n'));
    log(chalk.rgb(123, 45, 67).underline('> 删除模板功能\n'));
    log(chalk.hex('#DEADED').bold('Happy & Joy 😁\n'));

    const tplList = getTplLists();

    if (!tplList.length) {
      log('暂无模板');
      process.exit();
      return;
    }

    /** @name 获取用户输入 */

    const { tplName } = yield inquirer.prompt(checkPrompt);
    const { confirm } = yield inquirer.prompt([
      { name: 'confirm', message: '🤔  确定删除吗?', type: 'confirm' },
    ]);
    if (!confirm) {
      process.exit();
      return;
    }

    delete tplConfig.tplMap[tplName];

    fs.writeFileSync(__dirname + '/../../templates.json', JSON.stringify(tplConfig), 'utf-8', err => {
      if (err) {
        log(error(`\n ✘  ${err}`));
        process.exit();
        return;
      }
    });

    const cdmStr = `cd ${__dirname}/../templates && rm -rf ${tplName}`;
    exec(cdmStr, err => {
      if (err) {
        log(err);
        process.exit();
        return;
      }
      log(chalk.green('\n✨ 删除模板成功!\n'));
      log(chalk.grey('😁  The last template list is: \n'));
      const finalTplList = getTplLists();
      if (!finalTplList.length) {
        log('暂无模板');
        return;
      }
      logTplList();
    });
  });
};
