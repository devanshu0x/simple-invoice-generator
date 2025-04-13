import { useState } from 'react'
import Header from "./components/Header"
import InvoiceList from './components/InvoiceList'
import InvoiceForm from './components/InvoiceForm'
import { useDispatch, useSelector } from 'react-redux'
import { toggleForm } from './store/invoiceSlice'
import InvoiceDetails from './components/InvoiceDetails'

function App() {
  const dispatch= useDispatch();
  const {isFormOpen, selectedInvoice}=useSelector((state)=>state.invoices)
  const handleNewInvoice= ()=>{
    dispatch(toggleForm())
  }
  return (
    <>
    <div className='font-spartan'>
    <div className='bg-slate-900 text-white min-h-screen'>
          <div className='max-w-5xl mx-auto py-12 px-4'>
              <Header onNewInvoice={handleNewInvoice} />
              {selectedInvoice ? <InvoiceDetails invoice={selectedInvoice}/> : <InvoiceList/>}
              {isFormOpen && <InvoiceForm invoice={selectedInvoice}/>}
              
          </div>
      </div>
    </div>
      
    </>
  )
}

export default App
