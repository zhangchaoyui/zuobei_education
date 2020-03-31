import storage from "../stroage/index";
import { MessageBox } from 'mint-ui';
export default {
    login() {
        let type = storage.getItem("userType");
        if (type == 2) {
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
}