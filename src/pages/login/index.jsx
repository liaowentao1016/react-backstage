import React, { memo } from "react";

import { LQLoginWrapper } from "./style";

import { Form, Input, Button, message } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";

import { login } from "@/network/login";

export default memo(function LQLogin(props) {
  // 验证规则
  const userNameRules = [
    {
      required: true,
      message: "请输入用户名",
      trigger: "blur"
    },
    {
      min: 3,
      max: 10,
      message: "长度在 3 到 10 个字符",
      trigger: "blur"
    }
  ];

  const passWordRules = [
    { required: true, message: "请输入密码", trigger: "blur" },
    {
      min: 6,
      max: 16,
      message: "长度在 6 到 16 个字符",
      trigger: "blur"
    }
  ];

  // 获取Form组件实例
  const [form] = Form.useForm();

  // handle
  function onReset() {
    form.resetFields();
  }

  async function onFinish(data) {
    try {
      // 验证通过 发送网络请求
      const res = await login(data);
      // 将token存入sessionStorage中
      const { token } = res.data;
      window.sessionStorage.setItem("token", token);
      // 跳转到首页
      props.history.push("/layout");
      message.success("登录成功");
    } catch (error) {
      message.error("用户名或密码错误");
    }
  }
  return (
    <LQLoginWrapper>
      <div className="loginBox">
        <img
          src={require("@/assets/img/logo.png").default}
          alt="logo"
          className="logoImg"
        />

        {/* 表单 */}
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{
            username: "admin",
            password: "123456"
          }}
          onFinish={onFinish}
          form={form}
          size="large"
        >
          <Form.Item name="username" rules={userNameRules}>
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Username"
            />
          </Form.Item>
          <Form.Item name="password" rules={passWordRules}>
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>

          <div className="btnBox">
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              登录
            </Button>

            <Button
              type="primary"
              htmlType="reset"
              className="reset-form-button"
              onClick={onReset}
            >
              重置
            </Button>
          </div>
        </Form>
      </div>
    </LQLoginWrapper>
  );
});
