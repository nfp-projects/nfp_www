'use strict';

var todos = ctrl.list.map(function(task, index) {
  return <li className={task.completed() && 'completed'}>
    <div className='view'>
      <input
        className='toggle'
        type='checkbox'
        onclick={m.withAttr('checked', task.completed)}
        checked={task.completed()}
      />
      <label>{task.title()}</label>
      <button className='destroy' onclick={ctrl.remove.bind(ctrl, index)}/>
    </div>
    <input className='edit'/>
  </li>
});
