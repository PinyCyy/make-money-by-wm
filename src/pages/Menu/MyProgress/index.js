import { Progress } from 'antd'
import './index.less'
import { useEffect, useState } from 'react';
import { getShowTimes } from './func';

export default (props) => {
  const [showTimes, setShowTimes] = useState({})

  useEffect(()=>{
    const showTimes = getShowTimes(props)
    setShowTimes(showTimes)
  }, [])

  return (
    <div className='progress'>
        <Progress showInfo={false} percent={showTimes.progress} />
        <div className="time-list">
          {showTimes?.times?.map(item=>{
            return <div className="time-item" key={item.time} style={{left: item.left}}>
              <div className="time">{item.time}</div>
              <div className="name">{item.name.join('\n')}</div>
            </div>
          })}
        </div>
      </div>
  );
};
