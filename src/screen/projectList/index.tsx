import React, { useEffect, useState } from "react";
import ProjectTable from "./ProjectTable";
import SearchBar from "./SearchBar";
import { useDebounce, cleanObject, useMount } from "../../utils";
import { useHttp } from "../../utils/http";

const ProjectSys = () => {
  const [params, setParams] = useState({
    name: '', // 项目名称
    personId: '' // 对应的负责人
  })
  const [list, setList] = useState([])
  const [users, setUsers] = useState([])
  const debouncedParams = useDebounce(params, 200)
  // 使用hook封装请求 自动添加上登录信息token
  const client = useHttp()

  useMount(() => {
    client('users').then((data) => {
      setUsers(data)
    })
    // fetch(`${apiUrl}/users`).then(async res => {
    //   if (res.ok) {
    //     setUsers(await res.json())
    //   }
    // })
  })

  useEffect(() => {
    client('projects', {data: cleanObject(debouncedParams)}).then((data) => {
      setList(data)
    })
    // fetch(`${apiUrl}/projects?${qs.stringify(cleanObject(debouncedParams))}`).then(async res => {
    //   if (res.ok) {
    //     // console.log(res.json())
    //     setList(await res.json())
    //   }
    // })
  }, [debouncedParams]) // params发生变化 list更新数据

  return (
    <>
      <SearchBar params={params} setParams={setParams} users={users} />
      <ProjectTable list={list} users={users} />
    </>
  )
};

export default ProjectSys;
