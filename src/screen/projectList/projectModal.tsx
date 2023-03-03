
import React, { useEffect } from "react";
import { Button, Drawer, Form, Input, Spin } from "antd";
import { useProjectModal } from "./utils";
import { UserSelect } from "../../components/UserSelect";
import { useAddProject, useEditProject } from "../../utils/project";
import { ErrorBox } from "../../components/lib";
import styled from "@emotion/styled";

/** 创建/编辑项目的弹窗 */
const ProjectModal = () => {
  const {projectModalOpen, editingProject, isLoading, closeCreate, closeEdit} = useProjectModal();
  const title = editingProject ? '编辑项目' : '创建项目';

  // 判断是编辑/创建
  const useMutateProject = editingProject ? useEditProject : useAddProject;
  // 使用mutateAsync异步
  const { mutateAsync, error, isLoading: mutateLoading } = useMutateProject();
  const [ form ] = Form.useForm();
  const close = editingProject ? closeEdit : closeCreate;

  const onFinish = (value: any) => {
    mutateAsync({...value, ...editingProject}).then(() => {
      // 重新mount组件
      form.resetFields();
      close();
    })
  };

  useEffect(() => {
    form.setFieldsValue(editingProject);
  }, [editingProject, form])

  return <Drawer forceRender open={projectModalOpen} onClose={close} width='100%'>
    <Container>
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
    </Container>
  </Drawer>
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 80vh;
`

export default ProjectModal;
