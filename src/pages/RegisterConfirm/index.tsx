import { useRef, useState, useEffect } from 'react'
import { ProForm, ProFormText, ProFormInstance } from '@ant-design/pro-components';
import { message, Spin } from 'antd';
import { history, useParams } from '@umijs/max'
import service from '@/services'

import styles from './index.less'

interface onFinishProps {
  username: string;
  activation_code: string;
}

const RegisterComfirm = () => {
  const formRef = useRef<ProFormInstance>();
  const params = useParams<{ id: string }>()
  
  const [queryParams] = useState<any>(history.location.state)
  const confirmType = useRef<'form' | 'link'>(
    !!params?.id ? 'link' : 'form'
  )

  useEffect(() => {
    const requestParams = {
      activation_code: params.id,
      type: confirmType.current
    }
    console.log(requestParams);
  }, [params?.id])


  useEffect(() => {
    if (queryParams?.username) {
      formRef.current?.setFieldsValue({ username: queryParams.username })
    }
  }, [queryParams?.username])


  const onFinish = async (values: onFinishProps) => {
    const requestParams = {
      username: queryParams.username,
      activation_code: values.activation_code,
      type: confirmType.current
    }
    console.log(requestParams);

    // const { username, activation_code } = values
    // const result = await service.UserController.registerService({
    //   username, activation_code
    // })

    // if (result?.success) {
    //   message.success(result?.msg)
    //   history.push('/register-confirm')
    //   return
    // }

    // message.error(result?.msg)
    // return false
  }

  return (
    <div className={styles["register-container"]}>
      <div className={styles["register-form"]}>
        {confirmType.current === "form"
          ? (
            <div style={{ width: '60%' }}>
              <h1 style={{ marginBottom: 20, fontSize: 22 }}>用户激活</h1>
              <ProForm
                formRef={formRef}
                autoFocusFirstInput
                onFinish={onFinish}
              >
                <ProFormText
                  name="username"
                  label="用户名"
                  disabled
                  rules={[
                    { required: true, message: '请输入用户名' },
                    { type: 'email', message: '用户名请使用邮箱注册' }
                  ]}
                />
                <ProFormText
                  name="activation_code"
                  label="激活码"
                  rules={[
                    { required: true, message: '请输入激活码' },
                  ]}
                />
              </ProForm>
            </div>
          ) : (
            <Spin tip="正在激活中，请稍后 . . ." size='large' />
          )
        }
      </div>
    </div>
  );
};

export default RegisterComfirm
