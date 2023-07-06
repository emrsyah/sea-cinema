import TicketTabs from '@/components/TicketTabs'
import PlainNavbar from '@/components/layouts/PlainNavbar'
import { currentUser } from '@clerk/nextjs'
import React from 'react'

const TicketPage = async () => {
  const user = await currentUser()
  return (
    <div>
        <PlainNavbar title='My Ticket' />
        <div className='bg-gray-950 p-6 rounded w-full max-w-lg mx-auto my-8 flex flex-col gap-1'>
          <TicketTabs userId={user ? user.id : ""} />
        </div>
    </div>
  )
}

export default TicketPage