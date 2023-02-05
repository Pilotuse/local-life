import React from 'react'
import { Space } from 'antd'
import { useModel } from 'umi';

import UserInfoSettings from './components/UserInfoSettings'
import OperationAuth from './components/OperationAuth'
import SafeSettings from './components/SafeSettings'

import styles from './index.less'

const AccountAndSafe = () => {
  const { user, methods } = useModel('user')

  return (
    <div className={styles.account} >
      <div>
        <div className={styles.title}>您与 Local Life Pro</div>
        <div className={styles.settingbox}>
          <UserInfoSettings user={user} reloadUser={methods?.reloadUser} />
        </div>
      </div>
      <div>
        <div className={styles.title}>您的安全设置</div>
        <div className={styles.settingbox}>
          <SafeSettings user={user} />
        </div>
      </div>
      {
        user?.role === 0
          ? (
            <div>
              <div className={styles.title}>
                <Space>
                  <span style={{ fontSize: 16 }}>您的操作权限</span>
                  <span style={{
                    fontSize: 12,
                    color: '#999'
                  }}>
                    以下操作均为危险操作，请谨慎点击
                  </span>
                </Space>
              </div>
              <div className={styles.settingbox}>
                <OperationAuth />
              </div>
            </div>
          )
          : (<></>)
      }
    </div>
  )
}


export default AccountAndSafe
