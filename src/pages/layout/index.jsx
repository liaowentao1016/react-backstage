import React, { memo, useEffect, useState } from "react";

import { LQLayOutWrapper } from "./style";

import { Layout, Button, Menu, Breadcrumb } from "antd";
import {
  ContactsFilled,
  CodeSandboxSquareFilled,
  AppstoreFilled,
  ShoppingFilled,
  ProfileFilled,
  SignalFilled
} from "@ant-design/icons";

import { getMenus } from "@/network/menu";

export default memo(function LQLayout() {
  // state
  const [collapsed, setcollapsed] = useState(false);

  // 发送网络请求
  useEffect(() => {
    async function getMenu() {
      const res = await getMenus();
      console.log(res.data);
    }
    getMenu();
  }, []);
  // handle
  function onCollapse() {
    setcollapsed(!collapsed);
  }

  // 关于antd解构
  const { Header, Sider, Content } = Layout;
  const { SubMenu } = Menu;
  // submenu keys of first level
  const rootSubmenuKeys = ["user", "power", "goods", "order", "report"];

  const [openKeys, setOpenKeys] = useState(["user"]);

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
          <Button type="primary" className="logout">
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
              defaultSelectedKeys={["1"]}
              defaultOpenKeys={["user"]}
              openKeys={openKeys}
              onOpenChange={onOpenChange}
              style={{
                height: "100%",
                borderRight: 0,
                backgroundColor: "#333744"
              }}
            >
              <SubMenu key="user" icon={<ContactsFilled />} title="用户管理">
                <Menu.Item key="1">用户列表</Menu.Item>
              </SubMenu>
              <SubMenu
                key="power"
                icon={<CodeSandboxSquareFilled />}
                title="权限管理"
              >
                <Menu.Item key="2" icon={<AppstoreFilled />}>
                  角色列表
                </Menu.Item>
                <Menu.Item key="3">权限列表</Menu.Item>
              </SubMenu>
              <SubMenu key="goods" icon={<ShoppingFilled />} title="商品管理">
                <Menu.Item key="4">商品列表</Menu.Item>
                <Menu.Item key="5">分类参数</Menu.Item>
                <Menu.Item key="6">商品分类</Menu.Item>
              </SubMenu>
              <SubMenu key="order" icon={<ProfileFilled />} title="订单管理">
                <Menu.Item key="7">订单列表</Menu.Item>
              </SubMenu>
              <SubMenu key="report" icon={<SignalFilled />} title="数据统计">
                <Menu.Item key="8">数据列表</Menu.Item>
              </SubMenu>
            </Menu>
          </Sider>
          <Layout style={{ padding: "0 224px 24px" }}>
            <Breadcrumb style={{ margin: "16px 0" }}>
              <Breadcrumb.Item>Home</Breadcrumb.Item>
              <Breadcrumb.Item>List</Breadcrumb.Item>
              <Breadcrumb.Item>App</Breadcrumb.Item>
            </Breadcrumb>
            <Content
              className="site-layout-background"
              style={{
                padding: 24,
                margin: 0,
                minHeight: 280
              }}
            >
              Content
            </Content>
          </Layout>
        </Layout>
      </Layout>
    </LQLayOutWrapper>
  );
});
