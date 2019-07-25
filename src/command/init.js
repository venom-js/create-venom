const co = require("co");
const chalk = require("chalk");
const inquirer = require("inquirer");
const exec = require("child_process").exec;
const { getTplLists, copyFolder } = require("../utils/utils");

const checkPrompt = [
  {
    name: "tplName",
    message: "What functionality do you want to enable? 😁",
    type: "list",
    choices: getTplLists()
  }
];

const inputPrompt = [
  {
    name: "projectName",
    message: "Project Name? ",
    type: "input"
  }
];

module.exports = () => {
  co(function*() {
    const { tplName } = yield inquirer.prompt(checkPrompt);
    const input = yield inquirer.prompt(inputPrompt);
    const success = copyFolder(
      __dirname + `/../templates/${tplName}`,
      input.projectName
    );

    if (!success) {
      console.log("生成失败");
      process.exit();
      return;
    }
    console.log(chalk.green("\n √ Generation completed!"));
    console.log(`\n cd ${input.projectName} && yarn install \n`);
    process.exit();
  });
};

// const {
//   tplInfo: { gitUrl, branch }
// } = yield inquirer.prompt(checkPrompt);

// const { projectName } = yield inquirer.prompt([
//   {
//     name: "projectName",
//     message: "Project Name? ",
//     type: "input"
//   }
// ]);

// console.log("Start generating...");

// const cmdCode = `git clone -b ${branch} ${gitUrl} ${projectName}`;

// exec(cmdCode, error => {
//   if (error) {
//     console.log(error);
//     process.exit();
//     return;
//   }
//   console.log(chalk.green("\n √ Generation completed!"));
//   console.log(`\n cd ${projectName} && yarn install \n`);
//   process.exit();
// });
