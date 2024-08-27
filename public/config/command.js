window.command = {
  list: [
    { name: '创建房间', type: 'create', cmd: '!mp make' },
    { name: '设置房间密码', type: 'password', cmd: '!mp password' },
    { name: '邀请玩家', type: 'invite', cmd: '!mp invite' },
    { name: '设置裁判', type: 'ref', cmd: '!mp addref' },
    { name: '设置房间属性', type: 'room', cmd: '!mp set' },
    { name: '改变谱面', type: 'map', cmd: '!mp map' },
    { name: '指定模组', type: 'mod', cmd: '!mp mods' },
    { name: '开始比赛', type: 'start', cmd: '!mp start' },
    { name: '设置倒计时', type: 'timer', cmd: '!mp timer' },
    { name: '中止比赛', type: 'abort', cmd: '!mp abort' },
    { name: '中止倒计时', type: 'timerabort', cmd: '!mp aborttimer' },
    { name: 'Pick提示语', type: 'pick', cmd: 'Next team to pick:' },
    { name: 'Ban提示语', type: 'ban', cmd: 'Next team to ban:' },
  ],
};