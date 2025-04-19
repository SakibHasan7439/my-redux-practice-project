import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    isLoading : false,
    gadgets: [],
    error: null,
}

const BASE_URL = "http://localhost:3000/gadget";
export const fetchGadgetData = createAsyncThunk("/gadget/fetchGadgets", 
    async ()=>{
        const res = await axios.get(BASE_URL);
        return res.data;
    }
);

export const addGadget = createAsyncThunk("/gadget/addGadget", 
    async (gadget) => {
        const res = await axios.post(BASE_URL, gadget);
        return res.data;
    }
);

export const updateGadget = createAsyncThunk("/gadget/updateGadget",
    async ({id, gadget}) => {
        const res = await axios.put(`${BASE_URL}/${id}`, gadget);
        return res.data;
    });

export const deleteGadget = createAsyncThunk("/gadget/deleteGadget",
    async (id) => {
        // eslint-disable-next-line no-unused-vars
        const res = await axios.delete(`${BASE_URL}/${id}`);
        return id;
    }
)
const gadgetSlice = createSlice({
    name: "gadget",
    initialState,
    reducers: {

    },

    extraReducers:(builder) =>{
        builder
            .addCase(fetchGadgetData.pending, (state) =>{
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchGadgetData.fulfilled, (state, action) =>{
                state.isLoading = false;
                state.gadgets = action.payload;
            })
            .addCase(fetchGadgetData.rejected, (state, action) =>{
                state.isLoading = false;
                state.error = action.error.message;
            })
            .addCase(addGadget.fulfilled, (state, action) => {
                state.isLoading = false;
                state.gadgets.push(action.payload); // Add the new gadget to the array
            })
            .addCase(deleteGadget.fulfilled, (state, action) => {
                state.gadgets = state.gadgets.filter((gadget) => gadget.id !== action.payload);
            })
            .addCase(updateGadget.fulfilled, (state, action) => {
                const index = state.gadgets.findIndex((gadget) => gadget.id === action.payload.id);
                if (index !== -1) {
                    state.gadgets[index] = action.payload; // Update the gadget in the array
                }
            });
    },
});

export default gadgetSlice.reducer;