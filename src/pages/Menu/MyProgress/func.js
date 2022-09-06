import moment from "moment";

export const getShowTimes = (props) =>{
    const a = moment('2021-08-09').format('YYYY-MM-DD')//mock nowTime

    const { startTime, slaTime, expectTime, forecastTime, realityTime } = props
  
  const baseTimes = {
    startTime: {
        time: moment(startTime).format('YYYY-MM-DD'),
        name: ['开始时间']
    },
    slaTime: {
        time: moment(slaTime).format('YYYY-MM-DD'),
        name: ['sla完成时间']
    },
    forecastTime: {
        time: moment(forecastTime).format('YYYY-MM-DD'),
        name: realityTime ? ['预测完成时间','实际完成时间'] : ['预测完成时间']
    },
    expectTime: {
        time: moment(expectTime).format('YYYY-MM-DD'),
        name: ['期望时间']
    },
    nowTime: {
        time: a,
        name: ['当前时间']
    }
  }

  const timeList = []
  Object.keys(baseTimes).map(item=>{
      let flag = 'no';
      for(let i = 0; i < timeList.length ; i++){
        if(baseTimes[item].time === timeList[i].time){
            flag = i;
            break;
        }
      }
      if( flag !== 'no'){
          timeList[flag].name = timeList[flag].name.concat(baseTimes[item].name)
      }else{
          timeList.push(baseTimes[item])
      }
  })
  timeList.sort((a,b)=>moment(a.time).diff(b.time), 'days')
  const len = timeList.length;
  const totalTime = moment(timeList[len-1].time).diff(moment(timeList[0].time), 'days');
  
  const showTimes = [];

  timeList.map((item, index) =>{
      const persent = moment(item.time).diff(moment(timeList[0].time), 'days')/totalTime
      const left = index === 0 ? 0 : index === len-1 ? 1000 :
            persent <= 0.1 * index 
                ? 0.1 * index * 1000 
                : persent >= (1 - 0.1 * index) ? (1 - 0.1 * index) * 1000 : persent * 1000
      showTimes.push({
        ...item,
        persent: persent,
        left: left
      })
  })
  return {
      times: showTimes,
      progress: realityTime 
        ? moment(baseTimes.forecastTime.time).diff(moment(timeList[0].time), 'days') / totalTime * 100 
        : moment(baseTimes.nowTime.time).diff(moment(timeList[0].time), 'days') / totalTime  * 100
  }
}

