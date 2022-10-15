import React from "react";
import { Form, Input, Select } from "antd";

// 搜索框
export interface User {
  id: string;
  name: string;
  token: string;
}

interface SearchBarProps {
  params: {
    name: string;
    personId: string;
  };
  setParams: (params: SearchBarProps['params']) => void;
  users: User[];
}

const SearchBar = ({ params, setParams, users }: SearchBarProps) => {
  return (
    <Form style={{ 'marginBottom': '2rem' }} layout="inline">
      <Form.Item>
        <Input type="text" placeholder="项目名" value={params.name} onChange={e => setParams({
          ...params,
          name: e.target.value
        })}/>
      </Form.Item>
      <Form.Item>
        <Select value={params.personId} onChange={value => setParams({
          ...params,
          personId: value
        })}>
          <Select.Option value="">负责人</Select.Option>
          {
            users.map((user: User) => {
              return (
                <Select.Option key={user.id} value={user.id}>{user.name}</Select.Option>
              )
            }) 
          }
        </Select>
      </Form.Item>
    </Form>
  )
}

export default SearchBar;
