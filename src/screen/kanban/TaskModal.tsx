import React, { useEffect } from "react";
import { Form, Input, Modal, Button, Select } from "antd";
import { useTaskModal, useTaskQueryKey } from "./utils";
import { useDeleteTask, useEditTask } from "../../utils/task";
import { UserSelect } from "../../components/UserSelect";
import { TaskTypeSelect } from "../../components/TaskTypeSelect";
import { useEpics } from "../../utils/epic";
import { useEpicSearchParams } from "../epic/utils";

const layout = {
  labelCol: {span: 8},
  wrapperCol: {span: 16}
}

export const TaskModal = () => {
  const {editingTaskId, editingTask, close} = useTaskModal();
  const {mutateAsync: editTask, isLoading: editLoading} = useEditTask(useTaskQueryKey());
  const {mutate: deleteTask} = useDeleteTask(useTaskQueryKey());
  const [form] = Form.useForm();

  const {data: epics} = useEpics(useEpicSearchParams());

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
  }, [editingTask, form]);

  const confirmDeleteTask = (id: number) => {
    close();
    Modal.confirm({
      title: '确定删除任务吗?',
      okText: '确定',
      cancelText: '取消',
      onOk() {
        console.log('点击确定删除');
        deleteTask({id});
      },
      onCancel() {
        console.log('点击取消');
      },
    });
  }

  const onChange = (value: any) => {
    console.log('--选择的任务组', value);
  }

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

      <Form.Item
        label="任务组"
        name="epicId"
      >
        <Select
          placeholder="请选择归属的任务组"
          onChange={onChange}
          allowClear
        >
          {
            epics?.map(item => <Select.Option value={item?.id}>{item?.name}</Select.Option>)
          }
        </Select>
      </Form.Item>
    </Form>
    <div style={{textAlign: 'right'}}>
      <Button size="small" onClick={() => confirmDeleteTask(Number(editingTaskId))}>删除</Button>
    </div>
  </Modal>
}