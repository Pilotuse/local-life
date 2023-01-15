import React, { useEffect } from 'react'
import {
  LockOutlined,
  UserOutlined,
} from '@ant-design/icons';
import {
  LoginFormPage,
  ProFormCheckbox,
  ProFormText,
} from '@ant-design/pro-components';
import { message } from 'antd'
import service from '@/services'
import { history } from 'umi';

interface onFinishProps extends IUser.Login {
  autoLogin?: boolean;
}
const Login = () => {

  const onFinish = async (params: onFinishProps) => {
    const result = await service.UserController.login(params)

    if (!result?.success) {
      message.error(`${result?.msg}`)
      // 跳转至强制重置密码
      history.push(result?.data?.resetUrl)
      return;
    }
    // 将token 写入 session 根据autoLogin 来判断存在哪里
    const setFC = params?.autoLogin ? localStorage : sessionStorage;
    setFC.setItem("POST_TOKEN", result?.data.token)
    message.success(result?.msg)
    // 将密码存在 localStore中
    // 跳转至主页
    history.push('/')
  }

  useEffect(() => {
    //  进到页面、就清掉 token
    const hasLocalToken = localStorage.hasOwnProperty("POST_TOKEN");
    const hasSessToken = sessionStorage.hasOwnProperty("POST_TOKEN");

    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    hasLocalToken && localStorage.removeItem("POST_TOKEN")
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    hasSessToken && sessionStorage.removeItem("POST_TOKEN")
  }, [])


  return (
    <div style={{ backgroundColor: 'white', height: '100vh' }}>
      <LoginFormPage
        backgroundImageUrl="https://gw.alipayobjects.com/zos/rmsportal/FfdJeJRQWjEeGTpqgBKj.png"
        logo="https://github.githubassets.com/images/modules/logos_page/Octocat.png"
        title="智慧E家"
        subTitle="专业化的家庭中台"
        onFinish={onFinish}
      >
        <ProFormText
          name="username"
          fieldProps={{
            size: 'large',
            prefix: <UserOutlined className={'prefixIcon'} />,
          }}
          placeholder={'请输入用户名'}
          rules={[
            {
              required: true,
              message: '请输入用户名!',
            },
          ]}
        />
        <ProFormText.Password
          name="password"
          fieldProps={{
            size: 'large',
            prefix: <LockOutlined className={'prefixIcon'} />,
          }}
          placeholder={'请输入密码'}
          rules={[
            {
              required: true,
              message: '请输入密码！',
            },
          ]}
        />
        <div
          style={{
            marginBlockEnd: 24,
          }}
        >
          <ProFormCheckbox noStyle name="autoLogin">
            自动登录
          </ProFormCheckbox>
          <a
            style={{
              float: 'right',
            }}
          >
            忘记密码
          </a>
        </div>
      </LoginFormPage>
    </div>
  );
};

export default Login;
