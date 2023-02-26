import { List, Popover, Typography } from "antd";
import React from "react";
import { useProject } from "../utils/project";

/** 气泡卡片 */
const ProjectPopover = (props: {projectButton: JSX.Element}) => {
  // 项目列表数据
  const { data: projects, isLoading } = useProject();
  /** 收藏的项目 */
  const pinProjects = projects?.filter(item => item?.pin);
  /** 气泡卡片内容 */
  const content = <div>
    <Typography.Text type="secondary">收藏项目</Typography.Text>
    <List 
      dataSource={pinProjects} 
      renderItem={(item) => (
      <List.Item>{item?.name}</List.Item>
      )}
    />
    {props?.projectButton}
  </div>

  return <Popover placement="bottom" content={content} overlayStyle={{ minWidth: '30rem' }} >
    <h3>项目</h3>
  </Popover>
};

export default ProjectPopover;
