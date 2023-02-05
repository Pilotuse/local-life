
import { ModalForm, ProFormText } from '@ant-design/pro-components';
import { Form, message } from 'antd';

const waitTime = (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

const ResetPassword = () => {
  const [form] = Form.useForm<{ name: string; company: string }>();
  return (
    <ModalForm
      title="修改用户密码"
      trigger={<a>修改密码 </a>}
      form={form}
      autoFocusFirstInput
      modalProps={{
        destroyOnClose: true,
        onCancel: () => console.log('run'),
      }}
      submitter={{
        searchConfig: {
          resetText: '取消修改',
          submitText: '确认修改',
        }
      }}
      width={480}
      submitTimeout={2000}
      onFinish={async (values) => {
        await waitTime(2000);
        console.log(values.name);
        message.success('提交成功');
        return true;
      }}
    >
      <ProFormText.Password
        name="current_password"
        label="当前密码"
        placeholder="请输入当前密码"
        rules={[
          { required: true, message: '请输入当前密码' }
        ]}
      />
      <ProFormText.Password
        name="new_password"
        label="新密码"
        placeholder="请输入新密码"
        rules={[
          { required: true, message: '请输入新密码' }
        ]}
      />
      <ProFormText.Password
        name="retry_password"
        label="确认密码"
        placeholder="请再次输入新密码"
        rules={[
          { required: true, message: '请再次输入新密码' }
        ]}
      />
    </ModalForm>
  );
};

export default ResetPassword;
