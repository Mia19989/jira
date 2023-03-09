import React from "react";
import { List, Popover, Typography } from "antd";
import { useUsers } from "../utils/user";

/** 用户列表气泡卡片 */
const UserPopover = () => {
  const { data: users, refetch } = useUsers();
  const pinUsers = users?.filter(item => item?.name);

  /** 气泡卡片内容 */
  const content = <div>
    <Typography.Text type="secondary">负责人列表</Typography.Text>
    <List 
      dataSource={pinUsers} 
      renderItem={(item) => (
      <List.Item>{item?.name}</List.Item>
      )}
    />
  </div>

  return <Popover onOpenChange={() => refetch()} placement="bottom" content={content} overlayStyle={{ minWidth: '30rem' }} >
    <h3>负责人</h3>
  </Popover>
};

export default UserPopover;
