import React from "react";
import { User } from './SearchBar'
// 项目表格 项目 - 负责人

interface Project {
  id: string;
  name: string;
  personId: string;
  organization: string;
  created: string;
}

interface ProjectTableProps {
  list: Project[];
  users: User[];
}

const ProjectTable = ({list, users}: ProjectTableProps) => {
  return (
    <>
      <table>
        <thead>
          <tr>
            <th>项目名称</th>
            <th>负责人</th>
          </tr>
        </thead>
        <tbody>
          {
            list.map((project: Project) => {
              return (
                <tr key={project.id}>
                  <th>{project.name}</th>
                  <th>{users.find((user) => user.id === project.personId)?.name || "未知"}</th>
                </tr>
              )
            })
          }
        </tbody>
      </table>
    </> 
  )
};

export default ProjectTable;
