import React, { useEffect } from "react";
import { Form, Input, Modal } from "antd";
import { useTaskModal, useTaskQueryKey } from "./utils";
import { useEditTask } from "../../utils/task";
import { UserSelect } from "../../components/UserSelect";
import { TaskTypeSelect } from "../../components/TaskTypeSelect";

const layout = {
  labelCol: {span: 8},
  wrapperCol: {span: 16}
}

export const TaskModal = () => {
  const {editingTaskId, editingTask, close} = useTaskModal();
  const {mutateAsync: editTask, isLoading: editLoading} = useEditTask(useTaskQueryKey());
  const [form] = Form.useForm();

  const onCancel = () => {
    form.resetFields();
    close();
  }

  const onOk = async () => {
    await editTask({...editingTask, ...form.getFieldsValue()});
    form.resetFields();
    close();
  }

  useEffect(() => {
    form.setFieldsValue(editingTask);
  }, [editingTask, form])

  return <Modal forceRender={true} open={!!editingTaskId} title="编辑任务" cancelText="取消" okText="确定"
    confirmLoading={editLoading}
    onCancel={onCancel}
    onOk={onOk}>
    <Form {...layout} form={form} initialValues={editingTask}>
      <Form.Item
        label="任务名"
        name="name"
        rules={[{ required: true, message: '请输入任务名' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="经办人"
        name="processorId"
      >
        <UserSelect defaultOptionName="经办人" />
      </Form.Item>
      <Form.Item
        label="类型"
        name="typeId"
      >
        <TaskTypeSelect />
      </Form.Item>
    </Form>
  </Modal>
}