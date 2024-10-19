'use client'

import { useAuth } from '../components/AuthContext'
import AdminLogin from '../components/AdminLogin'

export default function AdminPage() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { user, loading } = useAuth()

  if (loading) {
    return <div>Loading...</div>
  }

  return <AdminLogin />
}