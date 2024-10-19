'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ChevronLeft, ChevronRight, Download } from 'lucide-react'
import * as XLSX from 'xlsx'
import { db } from '../../firebase' // Adjust the path as necessary
import { collection, getDocs, query, where, orderBy, Timestamp } from 'firebase/firestore'

interface FormData {
  email: string;
  name: string;
  whatsapp: string;
  contact: string;
  gender: string;
  dob: Date | string | null;
  collegeName: string;
  branch: string;
  yearOfStudy: string;
  graduationYear: string;
  collegeState: string;
  homeState: string;
  motherTongue: string;
  languages: string;
  hasExperience: string;
  yearsOfExperience: string;
  pastRole: string;
  pastCompany: string;
  breakInStudies: string;
  pendingBacklog: string;
  attendedInterviews: string;
  declaration: boolean;
  civilCriminalCase: string;
  disciplinaryCase: string;
  termsAccepted: boolean;
  applicationDate:Timestamp | null;
  id: string; 
}

export default function DataTable() {
  const [currentPage, setCurrentPage] = useState(1)
  const [filterDate, setFilterDate] = useState('')
  const [applicants, setApplicants] = useState<FormData[]>([])
  const [loading, setLoading] = useState(true)
  const itemsPerPage = 10

  function formatDate(date: Date | string | null): string {
    if (!date) return 'N/A';
    
    const d = date instanceof Date ? date : new Date(date);
    
    if (isNaN(d.getTime())) return 'Invalid Date';
    
    const day = d.getDate().toString().padStart(2, '0');
    const month = (d.getMonth() + 1).toString().padStart(2, '0');
    const year = d.getFullYear();
    
    return `${day}/${month}/${year}`;
  }

  useEffect(() => {
    const fetchApplicants = async () => {
      setLoading(true)
      try {
        const applicantsRef = collection(db, 'applications')
        let q = query(applicantsRef, orderBy('applicationDate', 'desc'))
        
        if (filterDate) {
          const filterDateStart = new Date(filterDate);
          filterDateStart.setHours(0, 0, 0, 0);
          const filterDateEnd = new Date(filterDate);
          filterDateEnd.setHours(23, 59, 59, 999);
          q = query(q, 
            where('applicationDate', '>=', Timestamp.fromDate(filterDateStart)),
            where('applicationDate', '<=', Timestamp.fromDate(filterDateEnd))
          )
        }

        const querySnapshot = await getDocs(q)
        const applicantsData: FormData[] = querySnapshot.docs.map(doc => ({
          ...doc.data() as FormData,
          id: doc.id
        }))
        setApplicants(applicantsData)
      } catch (error) {
        console.error("Error fetching applicants: ", error)
      }
      setLoading(false)
    }

    fetchApplicants()
  }, [filterDate])

  const totalPages = Math.ceil(applicants.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentData = applicants.slice(startIndex, endIndex)

  const handleExport = () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const dataToExport = applicants.map(({ id, ...item }) => ({
      ...item,
      applicationDate: item.applicationDate ? item.applicationDate.toDate().toLocaleString() : "N/A" ,
      dob: formatDate(item.dob),
      declaration: item.declaration ? 'Yes' : 'No',
      termsAccepted: item.termsAccepted ? 'Yes' : 'No'
    }));
  
    const ws = XLSX.utils.json_to_sheet(dataToExport);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Applicants");
    XLSX.writeFile(wb, `applicants_data_${filterDate || 'all'}.xlsx`);
  };

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <div className="pb-10">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto p-6 bg-white rounded-lg shadow-lg"
      >
        <h2 className="text-2xl font-bold mb-6 text-[#004aad]">Applicants Data</h2>
        
        <div className="flex justify-between items-center mb-4">
          <Input
            type="date"
            value={filterDate}
            onChange={(e) => setFilterDate(e.target.value)}
            className="w-48"
          />
          <Button onClick={handleExport} className="bg-[#004aad] hover:bg-[#003c8a]">
            <Download className="mr-2 h-4 w-4" /> Export to Excel
          </Button>
        </div>

        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>WhatsApp</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Application Date</TableHead>
                <TableHead>Gender</TableHead>
                <TableHead>Date of Birth</TableHead>
                <TableHead>College</TableHead>
                <TableHead>Branch</TableHead>
                <TableHead>Year of Study</TableHead>
                <TableHead>Graduation Year</TableHead>
                <TableHead>College State</TableHead>
                <TableHead>Home State</TableHead>
                <TableHead>Mother Tongue</TableHead>
                <TableHead>Languages</TableHead>
                <TableHead>Has Experience</TableHead>
                <TableHead>Years of Experience</TableHead>
                <TableHead>Past Role</TableHead>
                <TableHead>Past Company</TableHead>
                <TableHead>Break in Studies</TableHead>
                <TableHead>Pending Backlog</TableHead>
                <TableHead>Attended Interviews</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentData.map((item: FormData) => (
                <TableRow key={item.id}>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.email}</TableCell>
                  <TableCell>{item.whatsapp}</TableCell>
                  <TableCell>{item.contact}</TableCell>
                  <TableCell>{item.applicationDate ? item.applicationDate.toDate().toLocaleString() : 'N/A'}</TableCell>
                  <TableCell>{item.gender}</TableCell>
                  <TableCell>{formatDate(item.dob)}</TableCell>
                  <TableCell>{item.collegeName}</TableCell>
                  <TableCell>{item.branch}</TableCell>
                  <TableCell>{item.yearOfStudy}</TableCell>
                  <TableCell>{item.graduationYear}</TableCell>
                  <TableCell>{item.collegeState}</TableCell>
                  <TableCell>{item.homeState}</TableCell>
                  <TableCell>{item.motherTongue}</TableCell>
                  <TableCell>{item.languages}</TableCell>
                  <TableCell>{item.hasExperience}</TableCell>
                  <TableCell>{item.yearsOfExperience}</TableCell>
                  <TableCell>{item.pastRole}</TableCell>
                  <TableCell>{item.pastCompany}</TableCell>
                  <TableCell>{item.breakInStudies}</TableCell>
                  <TableCell>{item.pendingBacklog}</TableCell>
                  <TableCell>{item.attendedInterviews}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div className="flex justify-between items-center mt-4">
          <div>
            Page {currentPage} of {totalPages}
          </div>
          <div className="flex space-x-2">
            <Button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="bg-[#004aad] hover:bg-[#003c8a]"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="bg-[#004aad] hover:bg-[#003c8a]"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </motion.div>
    </div>
  )
}