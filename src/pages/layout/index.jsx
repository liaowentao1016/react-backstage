import React, { memo, useEffect, useState } from "react";

import { LQLayOutWrapper } from "./style";

import { renderRoutes } from "react-router-config";

import { Layout, Button, Menu, Modal } from "antd";
import {
  ContactsFilled,
  CodeSandboxSquareFilled,
  AppstoreFilled,
  ShoppingFilled,
  ProfileFilled,
  SignalFilled
} from "@ant-design/icons";

import { getMenus } from "@/network/menu";
import MenuItem from "antd/lib/menu/MenuItem";

export default memo(function LQLayout(props) {
  // state
  const [collapsed, setcollapsed] = useState(false);
  const [menuList, setMenuList] = useState([]);
  const [iconList] = useState([
    <ContactsFilled />,
    <CodeSandboxSquareFilled />,
    <ShoppingFilled />,
    <ProfileFilled />,
    <SignalFilled />
  ]);

  // 发送网络请求
  useEffect(() => {
    console.log("组件挂载");
    async function getMenu() {
      const res = await getMenus();
      setMenuList(res.data);
    }
    getMenu();

    return () => {
      console.log("组件卸载了");
    };
  }, []);

  // handle
  function onCollapse() {
    setcollapsed(!collapsed);
  }

  // 退出登录
  function showConfirm() {
    Modal.confirm({
      title: "确认退出登录吗?",
      onOk() {
        // 跳转到登录页面
        props.history.push("/login");
        // 将token移除
        window.sessionStorage.removeItem("token");
      },
      okText: "确认",
      cancelText: "取消"
    });
  }

  // 关于antd解构
  const { Header, Sider, Content } = Layout;
  const { SubMenu } = Menu;

  // submenu keys of first level
  function getSubMenuKeys() {
    let rootSubmenuKeys = [];
    menuList.forEach(item => {
      rootSubmenuKeys.push(item.id + "");
    });
    return rootSubmenuKeys;
  }

  // 所有子菜单对应的key值
  const rootSubmenuKeys = getSubMenuKeys();

  // 当前展开子菜单的key值 控制当前展开的子菜单
  const [openKeys, setOpenKeys] = useState([]);

  // 当前展开子菜单发生变化时
  const onOpenChange = keys => {
    const latestOpenKey = keys.find(key => openKeys.indexOf(key) === -1);
    if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      setOpenKeys(keys);
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    }
  };

  // 返回的jsx
  return (
    <LQLayOutWrapper>
      <Layout style={{ minHeight: "100vh" }}>
        <Header className="header">
          <img
            src={require("@/assets/img/avatar.jpg").default}
            alt="头像"
            className="avatar"
          />
          <span>电商后台管理系统</span>
          <Button type="primary" className="logout" onClick={showConfirm}>
            退出
          </Button>
        </Header>
        <Layout>
          <Sider
            className="slide"
            style={{
              overflow: "auto",
              height: "100vh",
              position: "fixed",
              left: 0
            }}
            collapsible
            collapsed={collapsed}
            onCollapse={onCollapse}
          >
            <Menu
              theme="dark"
              mode="inline"
              openKeys={openKeys}
              onOpenChange={onOpenChange}
              style={{
                height: "100%",
                borderRight: 0,
                backgroundColor: "#333744"
              }}
            >
              {menuList.map((item, index) => {
                return (
                  <SubMenu
                    key={item.id}
                    title={item.authName}
                    icon={iconList[index]}
                  >
                    {item.children.map((iten, indey) => {
                      return (
                        <MenuItem key={iten.id} icon={<AppstoreFilled />}>
                          {iten.authName}
                        </MenuItem>
                      );
                    })}
                  </SubMenu>
                );
              })}
            </Menu>
          </Sider>
          <Layout style={{ padding: "0 224px 24px" }}>
            <Content
              className="site-layout-background"
              style={{
                padding: 24,
                margin: 0,
                minHeight: 280
              }}
            >
              {renderRoutes(props.route.routes)}
            </Content>
          </Layout>
        </Layout>
      </Layout>
    </LQLayOutWrapper>
  );
});
