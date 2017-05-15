/**
 * Created by xiyan on 2017/3/16.
 */
window.onload = function () {
    var vm = new Vue({
        el: '#bai',
        data: {
            t1: '',
            datas: [],
            now: -1,
            isTrue: false,
            message: '这里将展示您的输入提示...'
        },
        methods: {
            get: function (ev) {
                if (ev.keyCode == 38 || ev.keyCode == 40) {
                    return
                }
                if (ev.keyCode == 13) {
                    window.open('https://www.baidu.com/s?ie=utf-8&f=3&rsv_bp=0&rsv_idx=1&tn=baidu&wd=' + this.t1);
                    this.t1 = ""
                }
                if (this.t1 == "") {
                    this.message = "这里将展示您的输入提示..."
                }
                this.$http.jsonp('https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su', {
                    wd: this.t1
                }, {
                    jsonp: 'cb'
                }).then(function (dat) {
                    this.datas = dat.data.s
                }, function () {

                })
            },
            top: function () {
                this.now--;
                if (this.now == -1) {
                    this.now = this.datas.length - 1
                }
                this.t1 = this.datas[this.now]
            },
            down: function () {
                this.now++;
                if (this.now == this.datas.length) {
                    this.now = 0
                }
                this.t1 = this.datas[this.now]
            },
            search: function () {
                if (this.t1 == ""||this.t1.replace(/(^\s*)|(\s*$)/g, "").length==0 ) {
                    this.message = "你输入的内容为空哦！";
                    this.isTrue = true;
                    return;
                }
                window.open('https://www.baidu.com/s?ie=utf-8&f=3&rsv_bp=0&rsv_idx=1&tn=baidu&wd=' + this.t1);
                vm.t1 = ""
            },
            open:function(index){
                window.open('https://www.baidu.com/s?ie=utf-8&f=3&rsv_bp=0&rsv_idx=1&tn=baidu&wd=' + this.datas[index]);
                this.t1 = ""
            }
        }
    })
};
