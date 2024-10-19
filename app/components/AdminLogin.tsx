'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { useRouter } from 'next/navigation'
import { useAuth } from './AuthContext'
import DataTable from './TableView'

export default function AdminLogin() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const router = useRouter()
  const { user, login, logout } = useAuth()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await login(email, password)
      setError('')
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      setError('Invalid email or password')
    }
  }

  const handleLogout = async () => {
    try {
      await logout()
      router.push('/admin')
    } catch (error) {
      console.error('Failed to log out', error)
    }
  }

  if (user) {
    return (
      <div className="container mx-auto p-4">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold text-[#004aad]">Admin Dashboard</h1>
          <Button onClick={handleLogout} variant="outline">Logout</Button>
        </div>
        <DataTable />
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-[#004aad]">Admin Login</h2>
        
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-1"
            />
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <Button 
            type="submit" 
            className="w-full bg-[#004aad] hover:bg-[#003c8a] transition-colors duration-300"
          >
            Login
          </Button>
        </form>
      </motion.div>
    </div>
  )
}