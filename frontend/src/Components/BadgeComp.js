import React from 'react'

import Badge from 'react-bootstrap/Badge';
import Stack from 'react-bootstrap/Stack';
import { Link } from 'react-router-dom';



const BadgeComp = ({data, link}) => {
  
  return (
    <Stack direction="horizontal" gap={3}>
        {data.map((item) => (
    <h5><Badge bg="secondary" className=''>{item.name}</Badge></h5>
        ))}
          <Link to={link}>

        <h5 className='' ><Badge bg="light" text='dark'  className='underline'>+Add More</Badge></h5>
        </Link>
  </Stack>
  )
}

export default BadgeComp