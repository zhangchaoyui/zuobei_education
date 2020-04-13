import storage from "../stroage/index";
import { MessageBox, Indicator, Toast } from 'mint-ui';
export default {
    //判断公共登录方法
    login() {
        let type = storage.getItem("status")
        if (type == 0) {
            MessageBox.confirm('请先登录~', '友情提示').then(action => {
                if (action == 'confirm') {
                    window.location.href = "/#/login"
                }
            }).catch(err => {
                if (err == 'cancel') {
                    window.location.href = "/#/"
                }
            })
        }
    },

    //加载方法
    Indicator(name) {
        Indicator.open({
            text: name + "...",
            spinnerType: "snake"
        });
    },

    //弹出问题
    toast(name) {
        Toast({
            message: name,
            position: "bottom",
            duration: 2000
        });
    },

    //路径
    GetQueryString(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        console.log(window.location.search)//?id=2
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return unescape(r[2]);
        return null;
    },
    //处理富文本问题
    showHtml(str) {
        return str
          .replace(str ? /&(?!#?\w+;)/g : /&/g, "&amp;")
          .replace(/&lt;/g, "<")
          .replace(/&gt;/g, ">")
          .replace(/&quot;/g, '"')
          .replace(/&#39;/g, "'");
      }
}