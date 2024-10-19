'use client'

import { useAuth } from './components/AuthContext'
import { Button } from "@/components/ui/button"
import { useRouter } from 'next/navigation'
import DataTable from "./components/TableView"

export default function Home() {
  const { user, loading } = useAuth()
  const router = useRouter()

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-[#004aad]"></div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-4xl font-bold text-[#004aad] mb-6">Welcome to Edzeeta Admin Panel</h1>
        <p className="text-xl mb-8">Please log in to access the admin dashboard.</p>
        <Button 
          onClick={() => router.push('/admin/login')}
          className="bg-[#004aad] hover:bg-[#003c8a] text-white font-bold py-2 px-4 rounded"
        >
          Go to Login
        </Button>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-[#004aad]">Admin Dashboard</h1>
        <Button 
          onClick={() => router.push('/admin/logout')}
          variant="outline"
        >
          Logout
        </Button>
      </div>
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <DataTable />
        </div>
      </div>
    </div>
  )
}