import { format, parseISO } from "date-fns";
import { useDispatch } from "react-redux";
import { deleteInvoice, markAsPaid, toggleForm } from "../store/invoiceSlice";
import InvoicePDFGenerator from "./InvoicePdfGenerator";

export default function InvoiceDetails({ invoice }) {
    const dispatch= useDispatch()

    const handleMarkAsPaid=()=>{
        dispatch(markAsPaid(invoice.id))
    }
    const handleDelete=()=>{
        dispatch(deleteInvoice(invoice.id))
    }
    const handleEdit=()=>{
        dispatch(toggleForm());
    }
  const formatDate = (dateString) => {
    try {
      return format(parseISO(dateString), "dd MMM yyyy");
    } catch (err) {
      return "Invalid date";
    }
  };
  return (
    <div className="bg-slate-800 rounded-lg p-8">
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center space-x-4">
          <span>Status </span>
          <div
            className={`px-4 py-2 rounded-lg flex items-center space-x-2 ${
              invoice.status === "paid"
                ? "bg-green-900/20 text-green-500"
                : invoice.status === "pending"
                ? "bg-orange-900/20 text-orange-500"
                : "bg-slate-700/50 text-slate-400"
            }`}
          >
            <div
              className={`h-2 w-2 rounded-full ${
                invoice.status === "paid"
                  ? "bg-green-500"
                  : invoice.status === "pending"
                  ? "bg-orange-500"
                  : "bg-slate-400"
              }`}
            ></div>
            <span className="capitalize">{invoice.status}</span>
          </div>
        </div>
        <div className="flex space-x-4">
          <InvoicePDFGenerator invoice={invoice}></InvoicePDFGenerator>
          <button className="px-6 py-3 rounded-full bg-slate-700 hover:bg-slate-600" onClick={handleEdit}>
            Edit
          </button>
          <button className="px-6 py-3 rounded-full bg-red-500 hover:bg-red-600" onClick={handleDelete}>
            Delete
          </button>
          <button className="px-6 py-3 rounded-full bg-violet-500 hover:bg-violet-600" onClick={handleMarkAsPaid}>
            Mark as Paid
          </button>
        </div>
      </div>
      <div className="bg-slate-900 rounded-lg p-8">
        <div className="flex justify-between mb-8">
          <div>
            <h2 className="text-xl font-bold mb-2">#{invoice.id}</h2>
            <p className="text-slate-400">{invoice.projectDescription}</p>
          </div>
          <div className="text-right text-slate-400">
            <p>{invoice.billFrom.streetAddress}</p>
            <p>{invoice.billFrom.city}</p>
            <p>{invoice.billFrom.postCode}</p>
            <p>{invoice.billFrom.country}</p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-8 mb-8">
          <div>
            <p className="text-slate-400 mb-2">Invoice Date</p>
            <p className="font-bold">{formatDate(invoice.invoiceDate)}</p>
            <p className="text-slate-400 mb-2">Payment due</p>
            <p className="font-bold">{formatDate(invoice.dueDate)}</p>
          </div>
          <div>
            <p className="text-slate-400 mb-2">Bill to</p>
            <p className="font-bold mb-2">{invoice.clientName}</p>
            <p className="text-slate-400">{invoice.billTo.streetAddress}</p>
            <p className="text-slate-400">{invoice.billTo.city}</p>
            <p className="text-slate-400">{invoice.billTo.postCode}</p>
            <p className="text-slate-400">{invoice.billTo.country}</p>
            <p></p>
          </div>
          <div>
            <p className="text-slate-400 mb-2">Sent to</p>
            <p className="font-bold">{invoice.billTo.clientEmail}</p>
          </div>
        </div>

        <div className="bg-slate-800 rounded-lg overflow-hidden">
          <div className="p-8">
            <table className="w-full">
              <thead>
                <tr className="text-slate-400">
                  <th className="text-left">Item</th>
                  <th className="text-right">Quantity</th>
                  <th className="text-right">Price</th>
                  <th className="text-right">Total</th>
                </tr>
              </thead>
              <tbody>
                {invoice.items.map((item)=>(
                    <tr className="text-white">
                    <th className="text-left">{item.name}</th>
                    <th className="text-right">{item.quantity}</th>
                    <th className="text-right">${item.price.toFixed(2)}</th>
                    <th className="text-right">${item.total.toFixed(2)}</th>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="bg-slate-900 p-8 flex justify-between items-center">
            <span className="text-white">Amount due</span>
            <span className="text-3xl font-bold">${invoice.amount.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
