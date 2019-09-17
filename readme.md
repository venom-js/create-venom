# create-venom

## 特性

- 快速生成umi、antd、typescript技术栈下的SPA应用
- 作为你自己的脚手架

## 如何使用

> 使用yarn

```shell
yarn global add create-venom
```

> 使用npm

```shell
npm i create-venom -g
```

## 查看

```shell
mingshined@chenxianshengdegongzuozhan:~ $ create-venom
Usage: create-venom <command>

Options:
  -V, --version  output the version number
  -h, --help     output usage information

Commands:
  add|a          添加一个模板
  list|l         显示所有模板
  init|i         生成项目
  delete|d       删除模板
```



## 查看当前模板

```
create-venom list
```

- umi-antd-dva-admin - 基于umi、antd、dva、typescript技术栈打造的中后台模板，支持布局可视化配置

## 生成项目

> 快速生成

```
create-venom init
```

> 选择模板

> 输入必要信息

> 输入布局配置

> 生成项目

## 添加模板

```shell
create-venom add
```

```shell
mingshined@chenxianshengdegongzuozhan:~/Desktop $ create-venom add
Hello!

欢迎使用create-venom!

> 添加模板功能

Happy & Joy!

👉  模板名称: demo
👉  Git Url: https://github.com/venom-js/umi-antd-dva-admin.git
👉  分支名称: master
```

## 删除模板

```shell
mingshined@chenxianshengdegongzuozhan:~/Desktop $ create-venom delete
Hello!

欢迎使用umi-pro-cli!

> 删除模板功能

Happy & Joy 😁

? Please select the template you want to delete? 😁 (Use arrow keys)
❯ umi-antd-dva-admin
```

