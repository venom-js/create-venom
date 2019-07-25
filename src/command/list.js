'use strict';
const { getTplLists, logTplList } = require('../utils/utils');

module.exports = () => {
  if (!getTplLists().length) {
    console.log('暂无模板');
    process.exit();
  }
  logTplList();
};
