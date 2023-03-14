
import React, { useEffect } from "react";
import { Button, Drawer, Form, Input, Spin } from "antd";
import { useProjectModal, useProjectsQueryKey } from "./utils";
import { UserSelect } from "../../components/UserSelect";
import { useAddProject, useEditProject } from "../../utils/project";
import { ErrorBox, ModalContainer } from "../../components/lib";

/** 创建/编辑项目的弹窗 */
const ProjectModal = () => {
  const {projectModalOpen, editingProject, isLoading, closeCreate, closeEdit} = useProjectModal();
  const title = editingProject ? '编辑项目' : '创建项目';

  // 判断是编辑/创建
  const useMutateProject = editingProject ? useEditProject : useAddProject;
  // 使用mutateAsync异步
  const { mutateAsync, error, isLoading: mutateLoading } = useMutateProject(useProjectsQueryKey());
  const [ form ] = Form.useForm();
  const close = editingProject ? closeEdit : closeCreate;

  const handleClose = () => {
    // 重新mount组件
    form.resetFields();
    close();
  };

  const onFinish = (value: any) => {
    console.log('----创建 编辑项目数据', value, editingProject);

    mutateAsync({...editingProject, ...value })
      .then(() => {
      handleClose();
    });
  };

  useEffect(() => {
    form.setFieldsValue(editingProject);
    console.log('---获取到的信息', editingProject);
  }, [editingProject, form])

  return <Drawer forceRender open={projectModalOpen} onClose={handleClose} width='100%'>
    <ModalContainer>
    {
      isLoading ? <Spin size="large" /> : <>
        <h1>{title}</h1>
        <ErrorBox error={error} />
        <Form form={form} layout="vertical" style={{ width: '40rem' }} onFinish={onFinish}>
          <Form.Item label='名称' name='name' rules={[{ required: true, message: '请输入项目名称' }]}>
            <Input placeholder="请输入项目名称" />
          </Form.Item>

          <Form.Item label='部门' name='organization' rules={[{ required: true, message: '请输入部门名称' }]}>
            <Input placeholder="请输入部门名称" />
          </Form.Item>

          <Form.Item label='负责人' name='personId'>
            <UserSelect defaultOptionName={'负责人'} />
          </Form.Item>

          <Form.Item style={{textAlign: 'right'}}>
            <Button loading={mutateLoading} type="primary" htmlType="submit">提交</Button>
          </Form.Item>
        </Form>
      </>
    }
    </ModalContainer>
  </Drawer>
};

export default ProjectModal;
