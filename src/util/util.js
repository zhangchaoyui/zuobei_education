import storage from "../stroage/index";
import vueCookie from 'vue-cookie'
import { MessageBox, Indicator, Toast } from 'mint-ui';
export default {
    //判断公共登录方法
    login() {
        let type = storage.getItem("status")
        if (type == 0) {
            MessageBox.confirm('请先登录~', '友情提示').then(action => {
                if (action == 'confirm') {
                    let a = window.location.href.split("/#/")[1];
                    if (a.split("/")[0] == 'worksdetail') {
                        vueCookie.set("w_id", a.split("/")[1], { expires: "3D" });
                        this.bind();
                    } else {
                        this.bind();
                    }
                }
            }).catch(err => {
                if (err == 'cancel') {
                    window.location.replace("/#/");
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
    },

    //微信授权
    bind() {
        console.log(111);
        const appid = "wx4522fb49b27981d6";
        const code = this.GetQueryString("code"); // 截取路径
        console.log(code)
        if (code == null || code === "") {
            const local = `http://zuobei.400539.com/#/register`;
            window.location.href =
                "https://open.weixin.qq.com/connect/oauth2/authorize?appid=" +
                appid +
                "&redirect_uri=" +
                encodeURIComponent(local) +
                "&response_type=code&scope=snsapi_userinfo&state=1#wechat_redirect";
        } else {
            this.code = code;
        }
    },
}