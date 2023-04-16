import React from "react";
import { Button, Form, Input, Modal } from "antd";
import { useAddUser, useUsers } from "../utils/user";

/** 新增负责人 */
const CreateUserModal = ({isShowModal, setIsShowModal}: {isShowModal: boolean, setIsShowModal: any}) => {
  const { data: users } = useUsers();
  const { mutateAsync, isLoading: mutateLoading } = useAddUser();
  const [ form ] = Form.useForm();

  const handleCancel = () => {
    form.resetFields();
    setIsShowModal(false);
  };

  const onFinish = (values: any) => {
    const count = (users?.length) == null ? 0 : users.length;
    mutateAsync({ ...values, id: count + 1 })
      .then(() => {
      handleCancel();
    });
  };

  return <Modal title="新增负责人" open={isShowModal} footer={null} centered maskClosable={false} onCancel={handleCancel}>
    <Form form={form} layout="vertical" style={{ width: '40rem', margin: 'auto' }} onFinish={onFinish}>
      <Form.Item label='负责人' name='name' rules={[{ required: true, message: '请输入负责人姓名' }]}>
        <Input placeholder="请输入负责人姓名" />
      </Form.Item>

      <Form.Item style={{textAlign: 'right'}}>
        <Button type="primary" loading={mutateLoading} htmlType="submit">提交</Button>
      </Form.Item>
    </Form>
  </Modal>
}

export default CreateUserModal;