import React from "react";
import { Button, Drawer } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { projectListActions, selectProjectModalOpen } from "./projectList.slice";

/** 创建/编辑项目的弹窗 */
const ProjectModal = () => {
  const dispatch = useDispatch();
  // useSelector 读取状态树 从里面的选择状态
  const projectModalOpen = useSelector(selectProjectModalOpen);

  return <Drawer
    open={projectModalOpen}
    width='100%'
    onClose={() => dispatch(projectListActions.closeProjectModal())}
  >
    <h1>Project Modal</h1>
    <Button onClick={() => dispatch(projectListActions.closeProjectModal())}>关闭</Button>
  </Drawer>
};

export default ProjectModal;
