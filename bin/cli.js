#!/usr/bin/env node --harmony
"use strict";

process.env.NODE_PATH = __dirname + "/../node_modules/";

const program = require("commander");

program.version(require("../package").version);

program.usage("<command>");

program
  .command("list")
  .description("显示所有模板")
  .alias("l")
  .action(() => {
    require("../src/command/list")();
  });

program
  .command("init")
  .description("生成项目")
  .alias("i")
  .action(() => {
    require("../src/command/init")();
  });

program.parse(process.argv);

if (!program.args.length) {
  program.help();
}
