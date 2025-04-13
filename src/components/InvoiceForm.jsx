import { Plus, Trash2, X } from "lucide-react";
import { useDispatch } from "react-redux";
import { addInvoice, toggleForm, updateInvoice } from "../store/invoiceSlice";
import { useEffect, useState } from "react";
import { addDays, format } from "date-fns";

export default function InvoiceForm({invoice}) {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState(() => {
    if(invoice){
      return {...invoice};
    }
    return {
      id: `INV${parseInt(Math.random() * 10000)}`,
      status: "pending",
      billFrom: {
        streetAddress: "",
        city: "",
        postCode: "",
        country: "",
      },
      billTo: {
        clientEmail: "",
        streetAddress: "",
        city: "",
        postCode: "",
        country: "",
      },
      clientName: "",
      items: [],
      paymentTerms: "Net 30 Days",
      projectDescription: "",
      invoiceDate: format(new Date(), "yyyy-MM-dd"),
      dueDate: format(addDays(new Date(), 30), "yyyy-MM-dd"),
      amount: 0,
    };
  });

  useEffect(()=>{
    if(invoice){
      setFormData(invoice)
    }
  },[invoice])

  const handleSubmit=(e)=>{
      e.preventDefault()
      if(invoice){
        dispatch(updateInvoice(formData));
      }
      else{
        dispatch(addInvoice(formData));
      }

  }

  const addItem=()=>{
    setFormData({
      ...formData,
      items:[...formData.items, {name:"",quantity:0,price:0,total:0}]
    })
  }

  const updateItem= (index, field, value)=>{
    const newItems=[...formData.items]
    newItems[index][field]=value;

    if(field==="quantity" || field==="price"){
      const qty= field==='quantity'? value: newItems[index].quantity
      const price= field==="price" ? value: newItems[index].price
      newItems[index].total=qty*price;
    }
    setFormData({
      ...formData,
      items:newItems
    })
  }

  const removeItem=(index)=>{
    setFormData({
      ...formData,
      items:formData.items.filter((_,i)=> i!==index)
    })
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-start justify-center overflow-y-auto">
      <div className="bg-slate-800 p-8 rounded-lg w-full max-w-2xl my-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold ">New Invoice</h2>
          <button type="button" onClick={() => dispatch(toggleForm())}>
            <X size={24} />
          </button>
        </div>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <h3 className="text-violet-500 font-bold">Bill Form</h3>
            <input
              type="text"
              placeholder="Street Address"
              value={formData.billFrom.streetAddress}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  billFrom: {
                    ...formData.billFrom,
                    streetAddress: e.target.value,
                  },
                })
              }
              required
              className="w-full bg-slate-900 rounded-lg p-3"
            ></input>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <input
              type="text"
              placeholder="City"
              value={formData.billFrom.city}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  billFrom: {
                    ...formData.billFrom,
                    city: e.target.value,
                  },
                })
              }
              required
              className="w-full bg-slate-900 rounded-lg p-3"
            ></input>
            <input
              type="text"
              placeholder="Post Code"
              value={formData.billFrom.postCode}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  billFrom: {
                    ...formData.billFrom,
                    postCode: e.target.value,
                  },
                })
              }
              required
              className="w-full bg-slate-900 rounded-lg p-3"
            ></input>
            <input
              type="text"
              placeholder="Country"
              value={formData.billFrom.country}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  billFrom: {
                    ...formData.billFrom,
                    country: e.target.value,
                  },
                })
              }
              required
              className="w-full bg-slate-900 rounded-lg p-3"
            ></input>
          </div>
          <div className="space-y-4">
            <h3 className="text-violet-500 font-bold">Bill To</h3>
            <input
              type="text"
              placeholder="Client's Name"
              value={formData.clientName}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  clientName: e.target.value,
                })
              }
              required
              className="w-full bg-slate-900 rounded-lg p-3"
            ></input>
            <input
              type="text"
              placeholder="Client's Email"
              value={formData.billTo.clientEmail}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  billTo: {
                    ...formData.billTo,
                    clientEmail: e.target.value,
                  },
                })
              }
              required
              className="w-full bg-slate-900 rounded-lg p-3"
            ></input>
            <input
              type="text"
              placeholder="Street Address"
              value={formData.billTo.streetAddress}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  billTo: {
                    ...formData.billTo,
                    streetAddress: e.target.value,
                  },
                })
              }
              required
              className="w-full bg-slate-900 rounded-lg p-3"
            ></input>
            <div className="grid grid-cols-3 gap-4">
              <input
                type="text"
                placeholder="City"
                value={formData.billTo.city}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    billTo: {
                      ...formData.billTo,
                      city: e.target.value,
                    },
                  })
                }
                required
                className="w-full bg-slate-900 rounded-lg p-3"
              ></input>
              <input
                type="text"
                placeholder="Post Code"
                value={formData.billTo.postCode}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    billTo: {
                      ...formData.billTo,
                      postCode: e.target.value,
                    },
                  })
                }
                required
                className="w-full bg-slate-900 rounded-lg p-3"
              ></input>
              <input
                type="text"
                placeholder="Country"
                value={formData.billTo.country}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    billTo: {
                      ...formData.billTo,
                      country: e.target.value,
                    },
                  })
                }
                required
                className="w-full bg-slate-900 rounded-lg p-3"
              ></input>
            </div>
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <input type="date" className="bg-slate-900 rounded-lg p-3" value={formData.invoiceDate}
              onChange={(e)=>{
                const newDate=e.target.value
                setFormData(
                  {
                    ...formData,invoiceDate:newDate, dueDate:format(addDays(new Date(newDate),30),"yyyy-MM-dd")
                  }
                )
              }}
              />
              <select className="bg-slate-900 rounded-lg p-3" value={formData.paymentTerms} onChange={(e)=>{
                setFormData({...formData, paymentTerms:e.target.value})
              }} required>
                <option>Net 30 days</option>
                <option>Net 60 days</option>
              </select>
            </div>
            <input
              type="text"
              placeholder="project description"
              value={formData.projectDescription}
              onChange={(e)=>setFormData({...formData, projectDescription:e.target.value})}
              required
              className="w-full bg-slate-900 rounded-lg p-3"
            />
          </div>

          <div className="space-y-4">
            <h3>Item List</h3>
            {formData.items.map((item,index)=>(
              <div key={index} className="grid grid-cols-12 gap-4 items-center">
              <input
                type="text"
                placeholder="Item Name"
                className="bg-slate-900 rounded-lg p-3 col-span-5"
                value={item.name}
                onChange={(e)=>updateItem(index,"name",e.target.value)}
              />
              <input
                type="number"
                placeholder="Quantity"
                className="bg-slate-900 rounded-lg p-3 col-span-2"
                min="1"
                step="1"
                value={parseInt(item.quantity)}
                onChange={(e)=>updateItem(index,"quantity",parseInt(e.target.value) || 0)}
                required
              />
              <input
                type="number"
                placeholder="Price"
                className="bg-slate-900 rounded-lg p-3 col-span-2"
                min="0"
                step="0.01"
                value={item.price}
                onChange={(e)=>updateItem(index,"price",parseFloat(e.target.value)|| 0)}
                required
              />
              <div className="col-span-2 text-right">${item.total}</div>
              <button type="button" onClick={()=>removeItem(index)} className="text-slate-400 hover:text-red-500">
                <Trash2 size={20} />
              </button>
            </div>
            ))}

            <button type="button" className="w-full bg-slate-700 hover:bg-slate-600 rounded-lg p-3 flex items-center justify-center space-x-2" onClick={addItem}>
              <Plus size={20} />
              Add New Item
            </button>
          </div>
          <div className="flex justify-end space-x-4">
            <button className="bg-violet-500 hover:bg-violet-600 px-6 py-3 text-white rounded-full" type='button' onClick={()=>dispatch(toggleForm())}>
              Cancel
            </button>
            <button className=" bg-violet-500 hover:bg-violet-600 px-6 py-3 text-white rounded-full" type="submit">
              {invoice? "Save Changes": "Create Invoice"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
