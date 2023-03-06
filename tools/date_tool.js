export default {
	dateTime(d) {
		 // console.log(d)

		let old = new Date(d);
		let now = new Date();
		// console.log("old:" + old)
		//获取old具体时间
		let date = old.getTime();
		let h = old.getHours()
		let m = old.getMinutes()
		let Y = old.getFullYear()
		let M = old.getMonth()
		let D = old.getDate()
		//获取now具体时间
		let ndate = now.getTime();
		let nh = now.getHours()
		let nm = now.getMinutes()
		let nY = now.getFullYear()
		let nM = now.getMonth()
		let nD = now.getDate()
		//当天时间
		if (D === nD && M === nM && Y === nY) {
			if (h < 10) {
				h = '0' + h
			}
			if (m < 10) {
				m = '0' + m
			}
			return h + ':' + m
		}
		//前天时间
		if (D + 1 === nD && M === nM && Y === nY) {
			if (h < 10) {
				h = '0' + h
			}
			if (m < 10) {
				m = '0' + m
			}
			return '昨天 ' + h + ':' + m
		} else {
			//大于两天时间
			return Y + '/' + (M + 1) + '/' + D;
		}
	},
	//聊天时间
	chatTime(d) {
		let old = new Date(d);
		let now = new Date();
		// console.log(old)
		//获取old具体时间
		let date = old.getTime();
		let h = old.getHours()
		let m = old.getMinutes()
		let Y = old.getFullYear()
		let M = old.getMonth()
		let D = old.getDate()
		//获取now具体时间
		let ndate = now.getTime();
		let nh = now.getHours()
		let nm = now.getMinutes()
		let nY = now.getFullYear()
		let nM = now.getMonth()
		let nD = now.getDate()
		//当天时间
		if (D === nD && M === nM && Y === nY) {
			if (h < 10) {
				h = '0' + h
			}
			if (m < 10) {
				m = '0' + m
			}
			return h + ':' + m
		}
		//前天时间
		if (D + 1 === nD && M === nM && Y === nY) {
			if (h < 10) {
				h = '0' + h
			}
			if (m < 10) {
				m = '0' + m
			}
			return '昨天 ' + h + ':' + m
		} else if (Y === nY) {
			return (M + 1) + '月' + D + '日 ' + h + ':' + m
		} else {
			//大于今年
			if (h < 10) {
				h = '0' + h
			}
			if (m < 10) {
				m = '0' + m
			}
			return Y + '年' + (M + 1) + '月' + D + '日 ' + h + ':' + m;
		}
	},
	//间隔时间差
	intervalTime(old, now) {
		
		
		 old = new Date(old);
		 now = new Date(now);
		 
		 // console.log("old:" + old)
		 // console.log("now:" + now)
		 var old_timestap = old.getTime()
		 var now_timestap = now.getTime()
		 
		 if (now_timestap > (old_timestap + 1000*60*5)) {
			 return now;
		 } else {
			 return ''
		 }
	},
	getPostTime(d) {
		// console.log(d)
		
		let old = new Date(d);
		let now = new Date();
		// console.log("old:" + old)
		//获取old具体时间
		let date = old.getTime();
		let h = old.getHours()
		let m = old.getMinutes()
		let Y = old.getFullYear()
		let M = old.getMonth()
		let D = old.getDate()
		//获取now具体时间
		let ndate = now.getTime();
		let nh = now.getHours()
		let nm = now.getMinutes()
		let nY = now.getFullYear()
		let nM = now.getMonth()
		let nD = now.getDate()
		// console.log("nh:" + nh)
		// console.log("m:" + m)
		//同一分钟内
		if (m === nm && h === nh && D === nD && M === nM && Y === nY) {
			return "刚刚"
		}
		//同一小时
		if (h === nh && D === nD && M === nM && Y === nY) {
			
			return nm - m + "分钟前";
		}
		
		//当天时间
		if (D === nD && M === nM && Y === nY) {
			
			return nh - h + "小时前"
		}
		//前天时间
		if (D + 1 === nD && M === nM && Y === nY) {
			if (h < 10) {
				h = '0' + h
			}
			if (m < 10) {
				m = '0' + m
			}
			return '昨天 ' + h + ':' + m
		} 
		if (Y === nY) {
			
			return (M + 1) + '/' + D 
		}
		//兜底方案
		return Y + '/' + (M + 1) + '/' + D;
		
	}
}
