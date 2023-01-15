import { PlusOutlined } from '@ant-design/icons';
import {
  DrawerForm,
  ProFormDateRangePicker,
  ProFormSelect,
  ProForm,
  ProFormText,
  ProFormDigit,
  ProFormTreeSelect,
  // ProFormDependency,
  ProFormUploadButton
} from '@ant-design/pro-components';
import { Button, Form, Space, message } from 'antd';
import CrossEndUpload from '../CrossEndUpload'
import services from '@/services'
import {
  PAY_TYPE,
  DRUG_TYPE,
  FAMILY_CIRCLE
} from '@/constants'
import { useModel } from 'umi'

interface AddDrugsProps {
  type: 'add' | 'modify';
  reload: ((resetPageIndex?: boolean | undefined) => Promise<void>) | undefined;
}

const AddDrugs = (props: AddDrugsProps) => {
  const { type = "add", reload } = props
  const { user } = useModel('user')
  const [form] = Form.useForm();
  const drugBarcode = Form.useWatch('drug_barcode', form);

  const onFinish = async (values: any) => {
    const result = await services.DrugController.AddDrugs(values)
    if (!result?.success) {
      message.error(result.msg)
      return true
    };
    message.success(result.msg)
    reload?.()
    return true
  }

  return (
    <DrawerForm
      title={type === "add" ? '新增药品信息' : '修改药品信息'}
      form={form}
      trigger={
        <Button type="primary">
          <PlusOutlined />
          {type === "add" ? '新增药品' : '修改'}
        </Button>
      }
      autoFocusFirstInput
      drawerProps={{
        destroyOnClose: true,
      }}
      width={740}
      submitTimeout={2000}
      onFinish={onFinish}
    >
      <ProFormText
        name="drugName"
        label="药品名称"
        placeholder="请输入药品名称"
        rules={[{ required: true, message: '请输入药品名称' }]}
      />
      <ProFormDigit
        name="drug_barcode"
        label="药品条码"
        placeholder="请输入药品条码"
        rules={[{ required: true, message: '请输入药品条码' }]}
      />

      <ProForm.Group>
        <ProFormDigit
          width="md"
          name="tablets"
          label="片剂量"
          placeholder="请输入片剂量"
          rules={[{ required: true, message: "请输入片剂量" }]}
        />
        <ProFormText
          width="md"
          name="take_medicine"
          label="服用方式"
          placeholder="请输入服用方式"
          rules={[{ required: true, message: "请输入服用方式" }]}
        />
      </ProForm.Group>

      <ProForm.Group>
        <ProFormDigit
          width="md"
          name="price"
          label="售价"
          placeholder="请输入售价"
        />
        <ProFormSelect
          width="md"
          name="pay_type"
          label="支付方式"
          placeholder="选择支付方式"
          options={PAY_TYPE}
        />
      </ProForm.Group>
      <ProForm.Group>
        <ProFormSelect
          width="md"
          name="drug_type"
          label="药品类型"
          placeholder="选择药品类型"
          rules={[{ required: true, message: "选择药品类型" }]}
          options={DRUG_TYPE}
        />
        <ProFormDateRangePicker width="md" name="lifespan" label="有效期" rules={[{ required: true, message: "选择药品类型" }]} />
      </ProForm.Group>
      <ProForm.Group>
        <ProFormTreeSelect
          name="indications"
          label="主治"
          width="md"
          disabled
          placeholder="请选择主治"
          allowClear
          secondary
          fieldProps={{
            showArrow: false,
            filterTreeNode: true,
            showSearch: true,
            dropdownMatchSelectWidth: false,
            labelInValue: true,
            autoClearSearchValue: true,
            multiple: true,

            treeNodeFilterProp: 'title',
            fieldNames: {
              label: 'title',
            },
          }}
        />
        <ProFormDigit
          width="md"
          name="early_warning"
          label="预警片剂"
          tooltip="低于预警片剂时会发送提醒"
          placeholder="请输入预警片剂"
        />
      </ProForm.Group>
      <ProForm.Group>
        <ProFormSelect
          width="md"
          name="medical_records"
          label="关联就医记录"
          placeholder="请关联就医记录"
        />
        <ProFormSelect
          width="md"
          name="insurance_consumption"
          label="关联医保消费"
          placeholder="请关联医保消费"
        />
      </ProForm.Group>
      <ProForm.Group>
        <ProFormSelect
          width="md"
          name="family_circle"
          label="关联家庭圈"
          placeholder="关联家庭圈"
          options={FAMILY_CIRCLE}
        />
        <ProFormText
          width="md"
          name="manufacturer"
          label="生产厂商"
          placeholder="请输入生产厂商"
        />
      </ProForm.Group>
      <ProFormUploadButton
        label={
          <Space>
            上传支付凭证
            <CrossEndUpload
              disabled={!drugBarcode}
              drugBarcode={drugBarcode}
              lable='上传支付凭证'
              taskName="paymen_voucher"
              userInfo={user}
            />
          </Space>
        }
        name="paymen_voucher"
        title="点击上传"
        fieldProps={{ maxCount: 1 }}
      />
      <ProFormUploadButton
        label={
          <Space>
            药品包装
            <CrossEndUpload
              disabled={!drugBarcode}
              drugBarcode={drugBarcode}
              taskName="packaging"
              lable='药品包装'
              userInfo={user}
            />
          </Space>
        }
        name="packaging"
        title="点击上传"
        fieldProps={{
          maxCount: 1
        }}
      />
      <ProFormUploadButton
        label={
          <Space>
            说明书
            <CrossEndUpload
              disabled={!drugBarcode}
              drugBarcode={drugBarcode}
              taskName="instructions"
              lable='说明书'
              userInfo={user}
            />
          </Space>
        }
        name="instructions"
        title="点击上传"
        fieldProps={{
          maxCount: 1
        }}
      />
    </DrawerForm>
  );
};


export default AddDrugs;