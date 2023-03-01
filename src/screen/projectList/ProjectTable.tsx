import { Dropdown, MenuProps, Table, TableProps } from "antd";
import React from "react";
import { User } from './SearchBar'
import dayjs from "dayjs";
import { Link } from "react-router-dom";
import Pin from "../../components/pin";
import { useEditProject } from "../../utils/project";
import { ButtonNoPadding } from "../../components/lib";
import { useProjectModal } from "./utils";
// 项目表格 项目 - 负责人

export interface Project {
  id: number;
  name: string;
  personId: number;
  organization: string;
  created: number;
  pin: boolean;
}

interface ProjectTableProps extends TableProps<Project> {
  users: User[];
  refresh?: () => void;
}

const ProjectTable = ({users, ...props}: ProjectTableProps) => {
  const { mutate } = useEditProject();
  // 柯里化
  const pinProject = (id: number) => (pin: boolean) => {
    mutate({id, pin}).then(props.refresh);
  }

  const {open} = useProjectModal();

  const items: MenuProps['items'] = [
    {
      label: <ButtonNoPadding type="link" onClick={open}>编辑</ButtonNoPadding>,
      key: 'edit',
    }
  ];

  return (
    <>
      <Table pagination={false} columns={[
        {
          title: <Pin checked={true} disabled={true} />,
          render(val, project) {
            return (
              // onCheckedChange 改变被选中的project中的pin属性值
              <Pin checked={project.pin} onCheckedChange={pinProject(project.id)}  />
            )
          }
        },
        {
          title: "项目名称",
          // dataIndex: "name",
          sorter: (a, b) => a.name.localeCompare(b.name),
          render(val, project) {
            return (
              <Link to={String(project.id)}>{project.name}</Link>
            )
          }
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
        },
        {
          title: "操作",
          render(val, project) {
            return (
              <Dropdown menu={{items}} trigger={['click']}>
                <ButtonNoPadding type="link">...</ButtonNoPadding>
              </Dropdown>
            )
          }
        }
      ]}
      {...props}>
      </Table>
    </> 
  )
};

export default ProjectTable;
