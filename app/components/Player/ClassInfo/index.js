import React, { useState, useEffect } from 'react';
import axios from 'axios';
import EdiText from 'react-editext';
import { Transition, animated } from 'react-spring/renderprops';

export default function ClassInfo({ classId, apiUrl, className }) {
  const [banji, setClass] = useState(undefined);
  const [name, setName] = useState(className);
  const [concept, setConcept] = useState('');

  useEffect(() => {
    axios
      .get(`${apiUrl}/getClass`, { params: { classId } })
      .then((res) => {
        setClass(res.data);
        setConcept(res.data.classConcept);
      })
      .catch((err) => alert(err));
  }, []);

  const handleSaveName = (value) => {
    axios
      .post(`${apiUrl}/updateClassName`, { name: value, classId })
      .then((res) => setName(value))
      .catch((err) => alert(err));
  };

  const handleSaveConcept = (value) => {
    axios
      .post(`${apiUrl}/updateClassConcept`, { concept: value, classId })
      .then((res) => setConcept(value))
      .catch((err) => alert(err));
  };

  return (
    <div>
      <div className='class-wrapper'>
        <span className='dot up'></span>
        <span className='dot bottom'></span>
        <div className='name-wrapper'>
          <label htmlFor='className'>班级姓名：</label>
          <EdiText
            type='text'
            value={name}
            inputProps={{ name: 'className' }}
            onSave={handleSaveName}
          />
        </div>
        <div className='concept-wrapper'>
          <label htmlFor='concept'>班级理念：</label>
          <EdiText
            type='textarea'
            value={concept}
            inputProps={{ name: 'concept' }}
            onSave={handleSaveConcept}
          />
        </div>
        <div className='rank-wrapper'>
          <span className='label'>班级排名：</span>
          <Transition
            items={banji && banji.rank}
            trail={600}
            from={{ transform: 'translate3d(0,1000px,0)' }}
            enter={{ transform: 'translate3d(0,0px,0)' }}
          >
            {(item) => (props) => (
              <animated.div className='rank' style={props}>
                &nbsp;&nbsp;{item}&nbsp;&nbsp;
              </animated.div>
            )}
          </Transition>
          <span className='label'>&nbsp;名</span>
        </div>
      </div>
    </div>
  );
}
