import { Button, Drawer } from "antd";
import React from "react";
import { useProjectModal } from "./utils";

/** 创建/编辑项目的弹窗 */
const ProjectModal = () => {
  const {projectModalOpen, close} = useProjectModal();

  return <Drawer open={projectModalOpen} onClose={close} width='100%'>
    <h1>Project Modal</h1>
    <Button onClick={close}>关闭</Button>
  </Drawer>
};

export default ProjectModal;
