import React from "react";
import { Form, Input } from "antd";
import { Project } from "./ProjectTable";
import { UserSelect } from "../../components/user-select";

// 搜索框
export interface User {
  id: number;
  name: string;
  token: string;
}

interface SearchBarProps {
  params: Partial<Pick<Project, 'name' | 'personId'>>;
  // params: {
  //   name: string;
  //   personId: string;
  // };
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
        <UserSelect
          defaultOptionName={'负责人'}
          value={params.personId} 
          onChange={(value: number) => setParams({
          ...params,
          personId: value
        })}></UserSelect>
        {/* <Select value={params.personId} onChange={value => setParams({
          ...params,
          personId: value
        })}>
          <Select.Option value="">负责人</Select.Option>
          {
            users.map((user: User) => {
              return (
                <Select.Option key={user.id} value={String(user.id)}>{user.name}</Select.Option>
              )
            }) 
          }
        </Select> */}
      </Form.Item>
    </Form>
  )
}

export default SearchBar;
