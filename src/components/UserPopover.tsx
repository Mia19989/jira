import React, { useState } from "react";
import { List, Popover, Typography } from "antd";
import { useUsers } from "../utils/user";
import { ButtonNoPadding } from "./lib";
import CreateUserModal from "./CreateUserModal";
import * as auth from "../auth-provider";

/** 用户列表气泡卡片 */
const UserPopover = () => {
  const { data: users, refetch } = useUsers();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const identity = auth.getAuthIdentity();

  /** 气泡卡片内容 */
  const content = <div style={{minWidth: "30rem"}}>
    <Typography.Text type="secondary">负责人列表</Typography.Text>
    <List 
      dataSource={users} 
      renderItem={(item) => (
      <List.Item>{item?.name}</List.Item>
      )}
    />
    { identity === "pm" && <ButtonNoPadding type="link" onClick={() => setIsModalOpen(true)}>添加负责人</ButtonNoPadding> }
  </div>

  return <div>
    <Popover onOpenChange={() => refetch()} placement="bottom" content={content} overlayStyle={{ minWidth: '30rem' }} >
      <h3 style={{margin: 'auto'}}>负责人</h3>
    </Popover>

    <CreateUserModal isShowModal={isModalOpen} setIsShowModal={setIsModalOpen} />
  </div>
};

export default UserPopover;
