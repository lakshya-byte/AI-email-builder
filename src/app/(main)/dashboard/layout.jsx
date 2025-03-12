import React from 'react'
import Header from '@/components/custom/Header'

function DashboardLayout({ children }) {
  return (
    <div>
      <Header />
      {children}
    </div>
  )
}

export default DashboardLayout
