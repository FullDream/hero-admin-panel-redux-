import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { useHttp } from "../../hooks/http.hook"

const initialState = {
    filters: [],
    filtersLoadingStatus: 'idle',
    activeFilter: 'all'
}

export const filterFetchActive = createAsyncThunk(
    'filters/filterFetchActive',
    () => {
        const {request} = useHttp()
        return request("http://localhost:3001/filters")
    }
) 

const filterSlice = createSlice({
    name: 'filter',
    initialState, 
    reducers: {
        filtersFetching: state => {state.filtersLoadingStatus = 'loading'},
        filtersFetched: (state, action) => {
            state.filtersLoadingStatus = 'idle'
            state.filters = action.payload
        },
        filtersFetchingError: state => {state.filtersLoadingStatus = 'error'},
        activeFilterChanged: (state, action) => {state.activeFilter = action.payload}
    },
    extraReducers: (builder) => {
        builder
            .addCase(filterFetchActive.pending, state => {state.filtersLoadingStatus = 'loading'})
            .addCase(filterFetchActive.fulfilled, (state, action) => {
                state.filtersLoadingStatus = 'idle'
                state.filters = action.payload
            })
            .addCase(filterFetchActive.rejected, state => {state.filtersLoadingStatus = 'error'})
            .addDefaultCase(() => {})
    }
})

const {actions, reducer} = filterSlice

export default reducer
export const {
    filtersFetching,
    filtersFetched,
    filtersFetchingError,
    activeFilterChanged
} = actions;