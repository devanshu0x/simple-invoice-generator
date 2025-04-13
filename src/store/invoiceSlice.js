import {createSlice} from "@reduxjs/toolkit"
import { addDays, format } from "date-fns";

const calculateAmount= (items)=>{
    return items.reduce((acc,item)=>{
        return acc+ item.total;
    },0)
}

const loadState= ()=>{
    try{
        const serializedState=localStorage.getItem("state");
        if(!serializedState){
            return {
                invoices:[],
                filter: "all",
                isFormOpen:false,
                selectedInvoice:null,
            
            }
        }
        return JSON.parse(serializedState)
    }
    catch(e){
        return {
            invoices:[],
            filter: "all",
            isFormOpen:false,
            selectedInvoice:null,
        
        }
    }
}

const saveState= (state)=>{
    try{
        const serializedState=JSON.stringify(state)
        localStorage.setItem("state",serializedState);
    }
    catch(e){
        console.log(e);
    }
}

const initialState=loadState();

const invoiceSlice= createSlice({
    name:"invoices",
    initialState,
    reducers:{
        addInvoice: (state,action)=>{
            const newInvoice={
                ...action.payload,
                amount:calculateAmount(action.payload.items),
                status:action.payload.status || "pending",
                dueDate:action.payload.dueDate || format(addDays(new Date(),30),"yyyy-MM-dd")
            }
            state.invoices.push(newInvoice)
            saveState(state)
        },

        setFilter: (state,action)=>{
            state.filter=action.payload;
        },

        toggleForm: (state)=>{
            state.isFormOpen=!state.isFormOpen;
            if(!state.isFormOpen){
                state.selectedInvoice=null;
            }
            saveState(state)
        },

        setSelectedInvoice:(state, action)=>{
            state.selectedInvoice=action.payload;
            state.isFormOpen=false;
            saveState(state);
        },

        markAsPaid: (state,action)=>{
            const invoice= state.invoices.find((inv)=>inv.id===action.payload)
            if(invoice){
                invoice.status="paid"
                state.selectedInvoice=null;
                state.isFormOpen=false;
                saveState(state)
            }
        },
        deleteInvoice:(state,action)=>{
            state.invoices=state.invoices.filter((inv)=>inv.id!==action.payload)
            state.selectedInvoice=null
            saveState(state);
        },

        updateInvoice: (state,action)=>{
            const updatedInvoice={
                ...action.payload,
                amount:calculateAmount(action.payload.items)
            }

            const index=state.invoices.findIndex((inv)=> inv.id===updatedInvoice.id);
            if(index!==-1){
                state.invoices[index]=updatedInvoice
            }
            state.selectedInvoice=null;
            state.isFormOpen=false;
            saveState(state)
        }
    },
})

export const {toggleForm,addInvoice, setFilter, setSelectedInvoice, markAsPaid, deleteInvoice,updateInvoice} =invoiceSlice.actions

export default invoiceSlice.reducer