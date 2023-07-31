import React from 'react'

const User = ({ Avatar,Name,UserId,Posts}) => {
  return (
    <div>
      <div >
           <h3>{Avatar} <br/>
             {Name}<br/>{UserId}<br/>{Posts}<br/>
           </h3>
      </div>
    </div>
  )
}

export default User;