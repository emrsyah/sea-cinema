import React from 'react'
import img from '@/public/sea-empty.svg'
import Image from 'next/image'

export const NoData = ({content = "No Data"} : {content?: string}) => {
  return (
    <div className='flex flex-col items-center'>
        <Image src={img} width={120} height={120} alt='empty image holder' className='w-56' />
        <h3 className='text-xl font-semibold raleway'>{content}</h3>
    </div>
  )
}

export default NoData