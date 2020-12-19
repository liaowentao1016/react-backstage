import React from "react";

import { Redirect } from "react-router-dom";

// 导入组件
const LQLayout = React.lazy(() => import("@/pages/layout/index.jsx"));
const LQLogin = React.lazy(() => import("@/pages/login/index.jsx"));
const LQHome = React.lazy(() => import("@/pages/home/index.jsx"));
const LQUser = React.lazy(() => import("@/pages/user/index.jsx"));
const LQPower = React.lazy(() => import("@/pages/power/index.jsx"));
const LQGoods = React.lazy(() => import("@/pages/goods/index.jsx"));
const LQReport = React.lazy(() => import("@/pages/report/index.jsx"));

const routes = [
  {
    path: "/",
    exact: true,
    render: () => <Redirect to="/login" />
  },
  {
    path: "/login",
    component: LQLogin
  },
  {
    path: "/layout",
    exact: true,
    component: LQLayout,
    render: () => <Redirect to="/home" />,
    routes: [
      {
        path: "/home",
        component: LQHome
      },
      {
        path: "/user",
        component: LQUser
      },
      {
        path: "/power",
        component: LQPower
      },
      {
        path: "/goods",
        component: LQGoods
      },
      {
        path: "/report",
        component: LQReport
      }
    ]
  }
];

export default routes;
