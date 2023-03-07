import React from "react";
import { Dropdown, MenuProps, Modal, Table, TableProps } from "antd";
import dayjs from "dayjs";
import { Link } from "react-router-dom";
import { User } from "../../types/user";
import Pin from "../../components/pin";
import { useDeleteProject, useEditProject } from "../../utils/project";
import { ButtonNoPadding } from "../../components/lib";
import { useProjectModal, useProjectsQueryKey } from "./utils";
import { Project } from "../../types/project";
interface ProjectTableProps extends TableProps<Project> {
  users: User[];
}

const ProjectTable = ({users, ...props}: ProjectTableProps) => {  
  // 柯里化
  const pinProject = (id: number) => (pin: boolean) => {
    mutate({id, pin});
  }

  const {startEdit} = useProjectModal();
  const { mutate } = useEditProject(useProjectsQueryKey());
  const { mutate: handleDelete } = useDeleteProject(useProjectsQueryKey());

  const items: MenuProps['items'] = [
    {
      label: '编辑',
      key: 'edit',
    },
    {
      label: '删除',
      key: 'delete',
    }
  ];

  const confirmDeleteModal = (id: number) => {
    Modal.confirm({
      title: '确定删除该项目吗?',
      content: '点击确定删除',
      okText: '确定',
      cancelText: '取消',
      onOk() {
        console.log('点击确定删除');
        handleDelete({id});
      },
      onCancel() {
        console.log('点击取消');
      },
    });
  }

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
              <Dropdown menu={{items, 
              onClick: (key) => {
                if (key.key === 'edit') {
                  startEdit(project.id);
                }
                if (key.key === 'delete') {
                  confirmDeleteModal(project.id);
                }
              }}} 
              trigger={['click']}>
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
