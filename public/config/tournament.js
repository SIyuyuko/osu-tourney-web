// 比赛配置
export default {
	// 比赛列表
	list: [{
		// 比赛名称
		title: "YHC SE 2024",
		// 比赛全称
		fullTitle: "Yuyuko's Hidden Cup Season Experimental 2024",
		// 比赛图片
		poster: "/config/image/tournament/yhcse2024.png",
		// 比赛时间
		time: "2024.7 - 2024.8",
		// 游戏模式
		mode: "osu",
		// 比赛形式
		type: "2v2 Team VS",
		// 主表格/网站链接
		mainSheetUrl: "https://docs.qq.com/sheet/DUlFBamNmeWFMVFZV",
		// 比赛状态
		status: "进行中",
		// 玩家数量
		players: 16,
		// 队伍
		team: [
			{
				name: "Oh Bhou",
				player: [13795588, 20971891, 32620473, 15525823]
			},
			{
				name: "Pata-Mon 粉丝团",
				player: [13013147, 15868788, 1814662, 32289237]
			}
		]
	}, {
		// 比赛名称
		title: "YHC S4",
		// 比赛全称
		fullTitle: "Yuyuko's Hidden Cup Season 4",
		// 比赛图片
		poster: "/config/image/tournament/yhcs4.png",
		// 比赛时间
		time: "2024.1 - 2024.2",
		// 游戏模式
		mode: "osu",
		// 比赛形式
		type: "4v4 Team VS",
		// 主表格/网站链接
		mainSheetUrl: "",
		// 比赛状态
		status: "已结束",
		// 玩家数量
		players: 58,
	}],
	// 首页比赛
	homeTournament: "YHC SE 2024"
}