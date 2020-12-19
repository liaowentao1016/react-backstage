import request from "./request";

export const getMenus = () => {
  return request({
    url: "menus"
  });
};
