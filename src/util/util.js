let util = {
    deepCopy(obj){
        return JSON.parse(JSON.stringify(obj));
    },
    formatTime(date, formatStr) {

        // 例子:format(new Date() ,"yyyy-MM-dd HH:mm:ss");
        /*  
        函数：填充0字符  
        参数：value-需要填充的字符串, length-总长度  
        返回：填充后的字符串  
        */
        var zeroize = function (value, length) {
            if (!length) {
                length = 2;
            }
            value = new String(value);
            for (var i = 0, zeros = ''; i < (length - value.length); i++) {
                zeros += '0';
            }
            return zeros + value;
        };
        return formatStr.replace(/"[^"]*"|'[^']*'|\b(?:d{1,4}|M{1,4}|yy(?:yy)?|([hHmstT])\1?|[lLZ])\b/g, function ($0) {
            switch ($0) {
                case 'd': return date.getDate();
                case 'dd': return zeroize(date.getDate());
                case 'ddd': return ['Sun', 'Mon', 'Tue', 'Wed', 'Thr', 'Fri', 'Sat'][date.getDay()];
                case 'dddd': return ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][date.getDay()];
                case 'M': return date.getMonth() + 1;
                case 'MM': return zeroize(date.getMonth() + 1);
                case 'MMM': return ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][date.getMonth()];
                case 'MMMM': return ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'][date.getMonth()];
                case 'yy': return new String(date.getFullYear()).substr(2);
                case 'yyyy': return date.getFullYear();
                case 'h': return date.getHours() % 12 || 12;
                case 'hh': return zeroize(date.getHours() % 12 || 12);
                case 'H': return date.getHours();
                case 'HH': return zeroize(date.getHours());
                case 'm': return date.getMinutes();
                case 'mm': return zeroize(date.getMinutes());
                case 's': return date.getSeconds();
                case 'ss': return zeroize(date.getSeconds());
                case 'l': return date.getMilliseconds();
                case 'll': return zeroize(date.getMilliseconds());
                case 'tt': return date.getHours() < 12 ? 'am' : 'pm';
                case 'TT': return date.getHours() < 12 ? 'AM' : 'PM';
            }
        });
    },
    // 遍历数组，将所有的key属性都设置为value的值
	setArrayAllValue(array, key, value){
		for(let i = 0;  i < array.length; i++){
			array[i][key] = value;
			this.setArrayAllValue(array[i].children, key, value);
		}
    },
    refreshData(arr){
        arr.forEach(item => {
            item.isComplete = item.children.every(_item => {
                return _item.isComplete;
            })
        });
    }
}



export default util;