import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosInstance } from "../../../api/axiosInstance";
import { coachListUrl, loginUrl, userListUrl } from "../../../api/apiUrl";

export const login = createAsyncThunk('auth/login',
    async (formData, { rejectWithValue }) => {
        try {
            const res = await axiosInstance.post(loginUrl, formData)
            console.log('login res', res)
            return res?.data
        }
        catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)

export const fetchCoachList = createAsyncThunk('auth/fetchCoachList',
    async () => {
        const res = await axiosInstance.get(coachListUrl)
        return res?.data.results
    }
)

export const fetchUserList = createAsyncThunk('auth/fetchUserList',
    async () => {
        const res = await axiosInstance.get(userListUrl)
        console.log('userlist', res.data)
        return res?.data.data
    }
)

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        token: localStorage.getItem("token") || null,
        role: localStorage.getItem("role") || null,
        coachList: [],
        userList: [],
        isLoading: false,
        error: null
    },
    reducers:{
        logout:(state)=>{
            state.token=null;
            state.role=null;
            state.coachList=[];
            state.userList=[];
            state.error=null;
            localStorage.removeItem('token');
            localStorage.removeItem('role');
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.isLoading = false;
                state.token = action.payload.token;
                state.role = action.payload.role;
                localStorage.setItem("token", action.payload.token)
                localStorage.setItem("role", action.payload.role)
            })
            .addCase(login.rejected, (state, action) => {
                state.isLoading = false;
                // console.log('payload',action.payload)
                state.error = action.payload.message;
            })

            .addCase(fetchCoachList.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchCoachList.fulfilled, (state, action) => {
                state.isLoading = false;
                state.coachList = action.payload
            })
            .addCase(fetchCoachList.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;
            })

            .addCase(fetchUserList.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchUserList.fulfilled, (state, action) => {
                state.isLoading = false;
                state.userList = action.payload;
            })
            .addCase(fetchUserList.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;
            })

    }
})
export const {logout}=authSlice.actions;
export default authSlice.reducer;