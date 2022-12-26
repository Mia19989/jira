import { Button, Drawer } from "antd";
import React from "react";

/** 创建/编辑项目的弹窗 */
const ProjectModal = (props: {open: boolean, onClose: () => void }) => {
  return <Drawer open={props?.open} onClose={props?.onClose} width='100%'>
    <h1>Project Modal</h1>
    <Button onClick={props?.onClose}>关闭</Button>
  </Drawer>
};

export default ProjectModal;
