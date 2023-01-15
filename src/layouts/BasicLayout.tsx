import React, { useEffect, useState } from 'react'
import { Outlet, useLocation, history, useModel } from 'umi';
import { Menu, MenuProps, Tag, Badge, Space, message, Avatar } from 'antd'
import { MENU_TARGET_BRAND, MENU_ROUTER } from '@/constants'
import services from '@/services'
import styles from './index.less';

const Layout = () => {
  const location = useLocation();
  const { setUser } = useModel('user')
  const [userInfo, setUserInfo] = useState<User>()
  const brand = MENU_TARGET_BRAND[location.pathname] as any || "";
  const defaultSelectedKeys = location.pathname?.substring(1).toUpperCase();
  const defaultOpenKeys = MENU_ROUTER?.filter((el: any) => {
    const filterResult = el?.children && el?.children?.filter((el: any) => el.key === defaultSelectedKeys)
    return !!filterResult?.length
  })?.[0]?.key as any;

  const onClick: MenuProps['onClick'] = (e) => {
    const path = '/' + e?.key?.toLowerCase()
    history.push(path)
  };

  const queryUserInfos = async () => {
    const result = await services.UserController.queryUserInfos()
    if (result?.success) {
      setUserInfo(result?.data)
      setUser(result?.data)
    }
  }

  useEffect(() => {
    const POST_TOKEN_LOCAL = localStorage.getItem("POST_TOKEN")
    const POST_TOKEN_SESS = sessionStorage.getItem("POST_TOKEN")

    if (!POST_TOKEN_LOCAL && !POST_TOKEN_SESS) {
      message.error("登录已失效，请重新登录")
      history.push('/login')
      return;
    }

    // 查询用户信息
    queryUserInfos()
  }, [localStorage.getItem("POST_TOKEN"), sessionStorage.getItem("POST_TOKEN")])



  return (
    <div className={styles.layout}>
      <div className={styles["layout-headers"]}>
        <div className={styles["layout-headers-brand"]}>
          家
        </div>
        <Space size={1}>
          <Tag color="default"> {brand} </Tag>
          <Tag color="green">
            <Badge status="processing" />
            <span style={{ marginLeft: 6 }}>
              监控服务启动中
            </span>
          </Tag>
          <Tag color="green">
            <Badge status="processing" />
            <span style={{ marginLeft: 6 }}>
              房间空气质量监控中
            </span>
          </Tag>
          <Tag color="green">
            <Badge status="processing" />
            <span style={{ marginLeft: 6 }}>
              特殊天气提醒
            </span>
          </Tag>
        </Space>
        <Avatar
          className={styles.avatar}
          size={48}
          src={userInfo?.avatar}
        />
      </div>
      <div className={styles["layout-container"]}>
        <div className={styles["layout-container-navs"]}>
          <Menu
            style={{ fontSize: 14 }}
            onClick={onClick}
            defaultSelectedKeys={[defaultSelectedKeys]}
            defaultOpenKeys={[defaultOpenKeys]}
            mode="inline"
            items={MENU_ROUTER}
          />
        </div>
        <div className={styles["layout-container-context"]}>
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default Layout
