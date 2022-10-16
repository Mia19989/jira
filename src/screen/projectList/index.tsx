import React, { useState } from "react";
import ProjectTable from "./ProjectTable";
import SearchBar from "./SearchBar";
import styled from "@emotion/styled";
import { Typography } from "antd";
import { useProject } from "../../utils/project";
import { useUser } from "../../utils/user";
import { useDebounce } from "../../utils";

const ProjectSys = () => {
  const [params, setParams] = useState({
    name: '', // 项目名称
    personId: '' // 对应的负责人
  })
  // const [list, setList] = useState([])
  // const [users, setUsers] = useState([])

  // 项目列表加载时 显示的loading
  // const [loading, setLoading] = useState<boolean>(true)
  // const {run, isLoading, data: list, error} = useAsync<Project[]>();
  const debouncedVal = useDebounce(params, 200);
  const {isLoading, data: list, error} = useProject(debouncedVal);
  const { data: users } = useUser()

  // 使用hook封装请求 自动添加上登录信息token
  // const client = useHttp()

  // useMount(() => {
  //   client('users').then((data) => {
  //     setUsers(data)
  //   })
  //   // fetch(`${apiUrl}/users`).then(async res => {
  //   //   if (res.ok) {
  //   //     setUsers(await res.json())
  //   //   }
  //   // })
  // })

  // 请求项目列表数据
  // useEffect(() => {
  //   // setLoading(true);
  //   // client('projects', {data: cleanObject(debouncedParams)}).then((data) => {
  //   //   setList(data)
  //   // })
  //   run(client('projects', {data: cleanObject(debouncedParams)}))

  //   // fetch(`${apiUrl}/projects?${qs.stringify(cleanObject(debouncedParams))}`).then(async res => {
  //   //   if (res.ok) {
  //   //     // console.log(res.json())
  //   //     setList(await res.json())
  //   //   }
  //   // })

  //   // setLoading(false);
    
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [debouncedParams]) // params发生变化 list更新数据

  return (
    <Container>
      <h1>项目列表</h1>
      <SearchBar params={params} setParams={setParams} users={users || []} />
      {error ? <Typography.Text type="danger">{error.message}</Typography.Text> : null}
      <ProjectTable dataSource={list || []} loading={isLoading} users={users || []} />
    </Container>
  )
};

const Container = styled.div`
  padding: 3.2rem;
`

export default ProjectSys;
