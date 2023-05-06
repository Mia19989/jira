import React from "react";
import ProjectTable from "./ProjectTable";
import SearchBar from "./SearchBar";
import { useProjects } from "../../utils/project";
import { useUsers } from "../../utils/user";
import { useDebounce, useDocumentTitle } from "../../utils";
import { useProjectModal, useProjectsSearchParams } from "./utils";
import { ButtonNoPadding, ErrorBox, Row, ScreenContainer } from "../../components/lib";
import * as auth from "../../auth-provider";

const ProjectSys = () => {
  // const [, setParams] = useState({
  //   name: '', // 项目名称
  //   personId: '' // 对应的负责人
  // })
  // const [list, setList] = useState([])
  // const [users, setUsers] = useState([])

  // 项目列表加载时 显示的loading
  // const [loading, setLoading] = useState<boolean>(true)
  // const {run, isLoading, data: list, error} = useAsync<Project[]>();
  useDocumentTitle('项目列表', false);
  const [params, setParams] = useProjectsSearchParams();
  const debouncedVal = useDebounce(params, 200);
  const {isLoading, data: list, error} = useProjects(debouncedVal);
  const { data: users } = useUsers();
  const {open} = useProjectModal();
  const identity = auth.getAuthIdentity();

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
    <ScreenContainer>
      <Row spaceBetween>
        <h1>项目列表</h1>
        { identity === "pm" && <ButtonNoPadding type="link" onClick={open}>创建项目</ButtonNoPadding> }
      </Row>
      <SearchBar params={params} setParams={setParams} users={users || []} />
      <ErrorBox error={error} />
      <ProjectTable dataSource={list || []} loading={isLoading} users={users || []} />
    </ScreenContainer>
  )
};

export default ProjectSys;
