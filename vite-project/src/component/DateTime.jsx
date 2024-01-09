import React, { useEffect, useState } from 'react'

const DateTime = () => {
  const [currentDate,setCurrentDate]=useState(new Date())
  useEffect(()=>{
const dateValid=setInterval(()=>{
setCurrentDate(new Date())
},1000)
return ()=>clearInterval(dateValid)
  },[])
  const formattedDateTime = currentDate.toLocaleString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    hour12: true,
  });
  return (
    <div>
<h3>{formattedDateTime}</h3>
    </div>
  )
}

export default DateTime