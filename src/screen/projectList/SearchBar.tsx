import React from "react";
import { Form, Input } from "antd";
import { Project } from "../../types/project";
import { UserSelect } from "../../components/UserSelect";
import { User } from "../../types/user";

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
      </Form.Item>
    </Form>
  )
}

export default SearchBar;
