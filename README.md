<!-- markdownlint-disable MD041 MD045 -->
# osu!tourney web

osu!tourney web 是一个 osu! 比赛信息管理项目，通过个性化配置在本地运行、查看并管理你的比赛以及图池。
> osu! tourney web is a manage project for osu! tournaments by running in local with custom configurations, which you can view and manage your tournaments or mappools.

如果你是一个比赛 Staff 新人，可能没有多少经验以及时间制作裁判表，或者对比赛指令的运用不够熟练，希望这个项目能对你的工作有所帮助！uwu
> If you are a tournament staff learner, may not have enough experience or time to make a referee sheet, or may not use tournament commands better. Hope it could help you in some ways! uwu

## Pages 组成

### Home 主页

主页展示个人信息（即项目使用者）、自定义横幅组件；设置为置顶的比赛、图池将会出现在主页。
> **Home** shows user information (here means the people who use the project) and custom banner components. Also the tournament or mappool that be set as pinned will shown in **Home** by default.

### Tournament 比赛

比赛页展示每届比赛信息，点击比赛详情能查看参赛玩家，同时提供玩家主页入口和复制邀请指令功能。
> **Tournament** shows each tournament infomation, you can click detail to see joined players, where provides functions here:
> - jump to view player info page
> - copy invite command

### Mappool 图池

图池页展示每届比赛中的图池，提供谱面主页入口、复制谱面 ID、下载谱面、复制谱面比赛指令功能。
> **Mappool** shows mappools in a tournament, providing functions like:
> - jump to view beatmap info page
> - copy beatmap id
> - download beatmap file
> - copy tournament command of beatmap

### Command 指令

指令页提供快捷比赛指令复制、裁判表组件功能。
> **Command** provides functions to quick copy tournament commands and use referee panel.

## Running the project 运行

1. 下载并安装 [Node.js](https://nodejs.org/zh-cn/download/prebuilt-installer)
   > Download and install [Node.js](https://nodejs.org/zh-cn/download/prebuilt-installer)
   
   安装成功后，在终端输入 `node` 并回车
   > After installing, input `node` in terminal and enter
   
   出现如下内容时，表示 Node.js 安装成功
   > When it shows words as follows, that means you installed successfully 
   ```bash
   Welcome to Node.js v20.12.1.
   Type ".help" for more information.
   > 
   (To exit, press Ctrl+C again or Ctrl+D or type .exit)
   > 
   ```
2. 使用 npm 全局安装 [anywhere](https://www.npmjs.com/package/anywhere)
   > use npm to install anywhere globally

   在终端输入指令
   > input command in terminal
   ```bash
   npm install anywhere -g
   ```
3. 项目解压后进入该目录，在当前目录下打开终端，输入指令启动项目
   > unzip the project and enter the folder, open a terminal under this directory, input command to run project
   ```bash
   anywhere -h localhost -p 5173
   ```
   项目成功启动时，在浏览器中输入 <http://localhost:5173/> 即可开始使用。
   > When running successfully, input <http://localhost:5173> in your browser then use it.
## Contribution Guide 贡献指南

感谢你为网站作出的贡献与提议！所有的提议将会在讨论可行性后得到实装。
> Thanks for your contributions and suggestions! All of these will be added in future version after discussions.

### Development environment 开发环境

- Node.js ≥ 20.12.1

### Steps to start 运行步骤

- 克隆项目仓库到本地
  > clone project to local.

- 编辑器打开文件夹，在终端中输入指令下载依赖
  > open project folder with IDE, input command in terminal as follows to install dependencies that project needs.

```bash
npm install
```

- 然后输入指令运行项目
  > input command to start project.

```bash
npm run dev
```

当终端中出现如下内容时，表示运行成功，点击网址即可在浏览器中查看网站
> When the terminal shows words like this, it means project started successfully. Now you can click the url to view website in your browser.

```bash
  vite v5.2.10 dev server running at:

  ➜  Local:   http://localhost:5173/
  ➜  Network: http://xxxx:5173/
```
