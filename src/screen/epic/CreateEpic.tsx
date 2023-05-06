
import React, { useEffect } from "react";
import { Button, DatePicker, Drawer, DrawerProps, Form, Input, Spin } from "antd";
import { ErrorBox } from "../../components/lib";
import styled from "@emotion/styled";
import { useAddEpic } from "../../utils/epic";
import { useEpicQueryKey } from "./utils";
import { useProjectIdInUrl } from "../kanban/utils";
import dayjs from "dayjs";

/** 创建任务组的弹窗 */
export const CreateEpic = (props: Pick<DrawerProps, 'open'> & {onClose: () => void}) => {
  const {mutateAsync: addEpic, error, isLoading} = useAddEpic(useEpicQueryKey());
  const projectId = useProjectIdInUrl();
  const [ form ] = Form.useForm();

  const onFinish = (value: any) => {
    console.log('--创建任务组', {...value, projectId});
    addEpic({...value, projectId});
    props.onClose();
  };

  useEffect(() => {
    form.resetFields();
  }, [props.open, form])

  return <Drawer forceRender open={props.open} onClose={props.onClose} destroyOnClose={true} width='100%'>
    <Container>
    {
      isLoading ? <Spin size="large" /> : <>
        <h1>创建任务组</h1>
        <ErrorBox error={error} />
        <Form form={form} layout="vertical" style={{ width: '40rem' }} onFinish={onFinish}>
          <Form.Item label='名称' name='name' rules={[{ required: true, message: '请输入任务组名称' }]}>
            <Input placeholder="请输入任务组名称" />
          </Form.Item>
          <Form.Item name="start" label="开始日期" rules={[{ required: true, message: '请选择开始日期' }]}>
            <DatePicker placeholder={'请选择开始日期'} style={{width: '100%'}} />
          </Form.Item>
          <Form.Item name="end" label="结束日期" rules={[{ required: true, message: '请选择结束日期' }]}>
            <DatePicker placeholder={'请选择结束日期'} style={{width: '100%'}} />
          </Form.Item>
          <Form.Item style={{textAlign: 'right'}}>
            <Button loading={isLoading} type="primary" htmlType="submit">提交</Button>
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
