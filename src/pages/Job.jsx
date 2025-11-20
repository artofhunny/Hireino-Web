import JobComponent from '@/components/JobComponent';
import React from 'react'
import { useParams } from 'react-router-dom';

const Job = () => {
  const { id } = useParams();

  return (
    <div className='md:px-8 pb-10'>
        <JobComponent id={id} />
    </div>
  );
}

export default Job;