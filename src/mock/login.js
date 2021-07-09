import { getParams } from "@/utils/util";
const USER_MAP = {
  admin: {
    name: "admin",
    user_id: "2",
    access: ["admin"],
    token: "admin",
    avatar: "",
    // permission: ['sys_area']
  },
  editor: {
    name: "editor",
    user_id: "1",
    access: ["editor"],
    token: "editor",
    avatar: "",
    permission: ["test21", "test22"],
  },
};

export const login = req => {
  req = JSON.parse(req.body);
  return { token: USER_MAP[req.username].token };
};

export const getUserInfo = req => {
  const params = getParams(req.url);
  return USER_MAP[params.token];
};

export const logout = req => {
  return null;
};
