import React, { useEffect, useState } from 'react';
import { Row, ScreenContainer } from '../../components/lib';
import { useProjectInUrl } from '../kanban/utils';
import { useDocumentTitle } from '../../utils';
import { Card } from 'antd';
import TasksPieChart from './TasksPieChart';
import { useEpics } from '../../utils/epic';
import { useEpicSearchParams } from '../epic/utils';
import { useTasks } from '../../utils/task';
import { AnyCnameRecord } from 'dns';

const ScheduleScreen = () => {
  useDocumentTitle('项目进度');
  const {data: currentProjcet} = useProjectInUrl();
  const {data: epics} = useEpics(useEpicSearchParams()); // 获取对应项目的任务组
  const {data: tasks} = useTasks({projectId: currentProjcet?.id}); // 获取对应项目的所有任务
  // 任务组 以及 对应任务组下面的任务个数
  const [chartData, setChartData] = useState<any>([]);

  useEffect(() => {
    let res: any = [];
    epics?.map(epic => {
      let item: {value: number, name: string} = {value: 0, name: epic.name};
      let count = 0;
      tasks?.map(task => {
        if (task.epicId === epic.id) count++;
      })
      item = {...item, value: count};
      res.push(item);
    })
    setChartData(res);
  }, [epics, tasks]);

  return <ScreenContainer>
  <Row spaceBetween={true}>
    <h1>{currentProjcet?.name}项目进度</h1>
  </Row>
  {/* 任务分配 */}
  <Card title="任务分配" style={{ width: '70%', marginTop: '20px' }}>
    <TasksPieChart projectName={currentProjcet?.name || '项目'} data={chartData} />
  </Card>
  {/* 任务排期 */}
</ScreenContainer>
}

export default ScheduleScreen;