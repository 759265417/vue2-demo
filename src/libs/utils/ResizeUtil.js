/* eslint-disable */
const ResizeUtil = {
  autoResizeContent: function (vueObj, otherHeight) {
    window.onresize = function () {
      ResizeUtil._updateContentHeight(vueObj, otherHeight);
    };
    ResizeUtil._updateContentHeightImpl(vueObj, otherHeight);
  },
  _updateContentHeight(vueObj, otherHeight) {
    if (vueObj._isResizing === true) {
      return;
    }
    vueObj._isResizing = true;
    setTimeout(() => {
      ResizeUtil._updateContentHeightImpl(vueObj, otherHeight);
      vueObj._isResizing = false;
    }, 200);
  },
  _updateContentHeightImpl(vueObj, otherHeight) {
    otherHeight = otherHeight | (0 + 3);
    let toolbarHeight = 0;
    const toolbar = document.querySelector(".toolbar");
    if (toolbar) {
      toolbarHeight = toolbar.offsetHeight;
    }
    vueObj.contentHeight = document.querySelector(".view-content").clientHeight - toolbarHeight - otherHeight;
  },
};

export default ResizeUtil;
