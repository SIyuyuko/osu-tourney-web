<!-- markdownlint-disable MD041 MD045 -->

# osu!tourney web

## Language 语言

- [中文](#中文)
- [English](#English)

---

### 中文

osu!tourney web 是一个 osu! 比赛信息管理项目，通过个性化配置在本地运行、查看并管理你的比赛以及图池。

如果你对于 osu! 比赛管理工作没有多少经验，没有时间制作或获取裁判表；或者对比赛指令的运用不够熟练，希望你能使用这个项目，并对你的工作有所帮助！uwu

#### 运行环境

- Node.js，版本高于 20.12.1

#### 运行前

1. 下载并安装 [Node.js](https://nodejs.org/zh-cn/download/prebuilt-installer)。

   - 安装成功后，在终端输入 `node` 并回车。
   - 出现如下内容时，表示 Node.js 安装成功。
   
   ```bash
   Welcome to Node.js v20.12.1.
   Type ".help" for more information.
   > 
   (To exit, press Ctrl+C again or Ctrl+D or type .exit)
   > 
   ```
   
2. 使用 npm 全局安装 [anywhere](https://www.npmjs.com/package/anywhere)。
   
   - 在终端输入指令：
   
   ```bash
   npm install anywhere -g
   ```
   
3. 项目解压后进入该目录，在当前目录下打开终端，输入指令启动项目。
   
   ```bash
   anywhere -h localhost -p 5173
   ```
   - 项目成功启动后，在浏览器中输入 <http://localhost:5173/> 即可开始使用。

#### 运行项目

- 克隆项目仓库到本地
  
- 编辑器打开文件夹，在终端中输入指令下载依赖

```bash
npm install
```

- 然后输入指令运行项目

```bash
npm run dev
```

- 当终端中出现如下内容时，表示运行成功，点击网址即可在浏览器打开的网站页面中，查看内容。
```bash
  vite v5.2.10 dev server running at:

  ➜  Local:   http://localhost:5173/
  ➜  Network: http://xxxx:5173/
```

#### 页面介绍

##### 主页

主页展示个人信息（即项目使用者）、自定义横幅组件；设置为置顶的比赛、图池将会出现在主页。

##### 比赛页

比赛页展示每届比赛信息，点击比赛详情能查看参赛玩家，同时提供玩家主页入口和复制邀请指令功能。

##### 图池页

图池页展示每届比赛中的图池，提供谱面主页入口、复制谱面 ID、下载谱面、复制谱面比赛指令功能。

##### 指令页

指令页提供快捷比赛指令复制、裁判表组件功能。

#### 贡献指南

我们欢迎并感谢您为此项目提出的积极建议与意见！如果有可行的新功能提议，将会在不久后实装。

---

### English

osu! tourney web is a manage project for osu! tournaments by running in local with custom configurations, which you can view and manage your tournaments or mappools.

If you are inexperienced in osu! tournament management, don't have time to create or obtain a handy referee sheets; or are not skilled enough in the use of tournament instructions, I hope that you will use this program and that it will help you in your work! uwu

#### Runtime

- Node.js, version higher than 20.12.1

#### Before Running

1. Download and install [Node.js](https://nodejs.org/zh-cn/download/prebuilt-installer)
   
   - After installing, input `node` in terminal and press `Enter`.
   
   - When it shows words as follows, that means you installed successfully 
   
   ```bash
   Welcome to Node.js v20.12.1.
   Type ".help" for more information.
   > 
   (To exit, press Ctrl+C again or Ctrl+D or type .exit)
   > 
   ```
2. use npm to install [anywhere](https://www.npmjs.com/package/anywhere) globally.
   
   - input command in terminal
   
   ```bash
   npm install anywhere -g
   ```
3. unzip the project and go to the folder, open a terminal under this directory, type command shown below to run anywhere.
   ```bash
   anywhere -h localhost -p 5173
   ```
   - When the program running successfully, input <http://localhost:5173> in your browser. then use it.

#### Run The project

- clone project to local.
  
- open project folder with IDE, input command in terminal as follows to install dependencies that project needs.

```bash
npm install
```

- input command to start project.

```bash
npm run dev
```

- When the terminal shows words like this, it means project started successfully. Now you can click the url to view website in your browser.

```bash
  vite v5.2.10 dev server running at:

  ➜  Local:   http://localhost:5173/
  ➜  Network: http://xxxx:5173/
```

#### Page Introduction

##### Home

**Home** shows user information (here means the people who use the project) and custom banner components. Also the tournament or mappool that be set as pinned will shown in **Home** by default.

##### Tournament

**Tournament** shows each tournament infomation, you can click detail to see joined players, where provides functions here:

  - jump to view player info page
  - copy invite command

##### Mappool

**Mappool** shows mappools in a tournament, providing functions like:

  - jump to view beatmap info page
  - copy beatmap id
  - download beatmap file
  - copy tournament command of beatmap

##### Command

**Command** provides functions to quick copy tournament commands and use referee panel.

#### Contribution Guide

We welcome and appreciate your positive suggestions and comments on this project! If there are feasible new features proposed, they will be implemented soon.
