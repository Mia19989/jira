import * as echarts from 'echarts';
import React, { useEffect, useRef } from 'react';

const TasksPieChart = (props: any) => {
  const chartRef:any = useRef();  //拿到DOM容器

  // 每当props改变的时候就会实时重新渲染
  useEffect(()=>{
    const chart = echarts.init(chartRef.current); //echart初始化容器
    let option = {
      tooltip: {
        trigger: 'item'
      },
      legend: {
        top: '5%',
        left: 'center',
        textStyle: {
          fontSize: 20
        }
      },
      series: [
        {
          width: '100%',
          name: props?.projectName,
          type: 'pie',
          radius: ['40%', '70%'],
          avoidLabelOverlap: false,
          itemStyle: {
            borderRadius: 10,
            borderColor: '#fff',
            borderWidth: 2
          },
          label: {
            show: false,
            position: 'center',
            fontSize: 17,
          },
          emphasis: {
            label: {
              show: true,
              fontWeight: 'bold'
            }
          },
          labelLine: {
            show: false
          },
          data: props?.data
        }
      ]
    };

    chart.setOption(option);
  }, [props]);

  return <div ref={chartRef} style={{width: '100%', height: '300px'}}></div>
}

export default TasksPieChart;
