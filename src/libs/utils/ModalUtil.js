/* eslint-disable */
import { Message } from "element-ui";
// import { MessageBox } from 'element-ui'
const ModalUtil = {
  messageError: function (msg) {
    Message.error(msg);
  },
  ageInfo: function (msg) {
    Message.info(msg);
  },
  messageSuccess: function (msg) {
    Message.success(msg);
  },
  ageWarning: function (msg) {
    Message.warning(msg);
  },
};
export default ModalUtil;
