import React from "react";
import { List, Popover, Typography } from "antd";
import { useProjectModal } from "../screen/projectList/utils";
import { useProjects } from "../utils/project";
import { ButtonNoPadding } from "./lib";

/** 收藏的项目列表气泡卡片 */
const ProjectPopover = () => {
  // 项目列表数据 refetch收藏的项目数据同步
  const { data: projects, refetch } = useProjects();
  /** 收藏的项目 */
  const pinProjects = projects?.filter(item => item?.pin);
  const {open} = useProjectModal();

  /** 气泡卡片内容 */
  const content = <div>
    <Typography.Text type="secondary">收藏项目</Typography.Text>
    <List 
      dataSource={pinProjects} 
      renderItem={(item) => (
      <List.Item>{item?.name}</List.Item>
      )}
    />
    <ButtonNoPadding type="link" onClick={open}>创建项目</ButtonNoPadding>
  </div>

  return <Popover onOpenChange={() => refetch()} placement="bottom" content={content} overlayStyle={{ minWidth: '30rem' }} >
    <h3>项目</h3>
  </Popover>
};

export default ProjectPopover;
