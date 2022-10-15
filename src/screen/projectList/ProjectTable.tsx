import { Table } from "antd";
import React from "react";
import { User } from './SearchBar'
import dayjs from "dayjs";
// 项目表格 项目 - 负责人

interface Project {
  id: string;
  name: string;
  personId: string;
  organization: string;
  created: number;
}

interface ProjectTableProps {
  list: Project[];
  users: User[];
}

const ProjectTable = ({list, users}: ProjectTableProps) => {
  return (
    <>
      <Table pagination={false} columns={[
        {
          title: "项目名称",
          dataIndex: "name",
          sorter: (a, b) => a.name.localeCompare(b.name)
        },
        {
          title: "部门",
          dataIndex: "organization"
        },
        {
          title: "负责人",
          dataIndex: "id",
          render(value, project) {
            return <span>
              {
                users.find((user) => user.id === project.personId)?.name || "未知"
              }
            </span>
          }
        },
        {
          title: "创建时间",
          dataIndex: "created",
          render(val, project) {
            return <span>
              {
                project.created ? dayjs(project.created).format('YYYY-MM-DD') : "无"
              }
            </span>
          }
        }
      ]} dataSource={list}>
      </Table>
    </> 
  )
};

export default ProjectTable;
