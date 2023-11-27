/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react'

const HeaderSection = ({name,IconS,actionName,action}) => {
  return (
    <div className='headerSection'>
        <div style={{display:"flex",alignItems:"center",gap:10}}>
            {IconS}
            <h1>{name}</h1>
        </div>
        <>
          {
            action ?
            <div style={{display:"flex",alignItems:"center",gap:10}}>
                <button onClick={action}>{actionName}</button>
            </div>
            :
            <></>
          }
        </>
    </div>
  )
}

export default HeaderSection