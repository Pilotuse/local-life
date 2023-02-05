import {
  ModalForm,
  ProFormText,
} from '@ant-design/pro-components';
import { Form, message } from 'antd';
import copy from 'copy-to-clipboard';
import services from '@/services'

interface VerifyPasswordProps {
  title?: React.ReactNode;
  trigger?: JSX.Element | undefined;
}

const VerifyPassword = (props: VerifyPasswordProps) => {
  const { trigger, title } = props
  const [form] = Form.useForm();

  return (
    <ModalForm
      title={title}
      trigger={trigger}
      form={form}
      width={400}
      autoFocusFirstInput
      modalProps={{
        destroyOnClose: true,
        onCancel: () => console.log('run'),
      }}
      layout="horizontal"
      submitTimeout={2000}
      onFinish={async (values) => {
        console.log(values);
        const { password } = values
        const result = await services.UserController.queryUserUUIDService({ password })
        if (result?.success) {
          copy(result?.data?.uuid);
          message.success('复制成功');
          return true;
        } else {
          message.error(result?.msg);
        }
      }}
    >
      <div style={{ paddingTop: 20 }}>
        <ProFormText.Password
          name="password"
          label="密码"
          rules={[
            { required: true, message: '请输入密码' }
          ]}
        />
      </div>
    </ModalForm>
  );
};

export default VerifyPassword;
