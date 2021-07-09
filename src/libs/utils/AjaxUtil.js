/* eslint-disable */
import ModalUtil from "./ModalUtil";
import axios from "axios";
import { MessageBox } from "element-ui";
const AjaxUtil = {
  load: function (url, callBack, params, tips) {
    AjaxUtil.ajaxPost(url, params, callBack, tips);
  },
  active: function (url, params, callBack) {
    AjaxUtil.ajaxPost(url, params, callBack);
  },
  add: function (url, params, callBack, tips) {
    AjaxUtil.ajaxPost(url, params, callBack, tips || "添加");
  },
  remove: function (url, params, callBack, tips) {
    AjaxUtil.ajaxPost(url, params, callBack, tips || "删除");
  },
  update: function (url, params, callBack, tips) {
    AjaxUtil.ajaxPost(url, params, callBack, tips || "编辑");
  },
  setup: function (url, params, callBack, tips) {
    AjaxUtil.ajaxPost(url, params, callBack, tips || "编辑");
  },
  ajaxPost(url, params, callBack, tips) {
    axios
      .post(url, params || {}, {
        headers: {
          "Content-Type": "application/json",
          "token": localStorage.getItem("token"),
        },
      })
      .then(function (res) {
        const result = res.data;
        if (result.status !== "OK") {
          ModalUtil.messageError((tips != null ? tips : "请求") + "失败");
          MessageBox.alert(`${res.data.message}`, "提示", {
            confirmButtonText: "确定",
          }).catch(() => {});
        } else {
          callBack(res, result);
          if (tips) {
            ModalUtil.messageSuccess(tips + "成功");
          }
        }
      })
      .catch(err => {
        ModalUtil.messageError(err);
      });
  },
};
export default AjaxUtil;
