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
    component: LQLayout,
    routes: [
      {
        path: "/layout",
        exact: true,
        render: () => <Redirect to="/layout/home" />
      },
      {
        path: "/layout/home",
        component: LQHome
      },
      {
        path: "/layout/user",
        component: LQUser
      },
      {
        path: "/layout/power",
        component: LQPower
      },
      {
        path: "/layout/goods",
        component: LQGoods
      },
      {
        path: "/layout/report",
        component: LQReport
      }
    ]
  }
];

export default routes;
