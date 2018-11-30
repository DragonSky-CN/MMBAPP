var tools = {
    // 获取参数
    getParameter : {
        // 获取地址栏传递的参数对象
        getUrlParameterObj : function() {
            var obj = {};
            var search = decodeURI(location.search);
            var arr = search.slice(1).split("&");
            arr.forEach(function(e) {
                obj[e.split('=')[0]] = e.split('=')[1];
            });
            // 控制台调试输出语句
            // console.log(obj);
            return obj;
        },
        getUrlParameter : function(key) {
            return this.getUrlParameterObj()[key];
        }
    }
}