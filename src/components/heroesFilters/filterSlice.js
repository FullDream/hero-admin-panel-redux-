import { createSlice, createAsyncThunk, createEntityAdapter } from "@reduxjs/toolkit"
import { useHttp } from "../../hooks/http.hook"

const filtersAdapter = createEntityAdapter()

const initialState = filtersAdapter.getInitialState({
    filtersLoadingStatus: 'idle',
    activeFilter: 'all'
})

// const initialState = {
//     filters: [],
    // filtersLoadingStatus: 'idle',
    // activeFilter: 'all'
// }

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
        // filtersFetching: state => {state.filtersLoadingStatus = 'loading'},
        // filtersFetched: (state, action) => {
        //     state.filtersLoadingStatus = 'idle'
        //     filtersAdapter(state, action.payload)
        // },
        // filtersFetchingError: state => {state.filtersLoadingStatus = 'error'},
        activeFilterChanged: (state, action) => {state.activeFilter = action.payload}
    },
    extraReducers: (builder) => {
        builder
            .addCase(filterFetchActive.pending, state => {state.filtersLoadingStatus = 'loading'})
            .addCase(filterFetchActive.fulfilled, (state, action) => {
                state.filtersLoadingStatus = 'idle'
                filtersAdapter.setAll(state, action.payload)
            })
            .addCase(filterFetchActive.rejected, state => {state.filtersLoadingStatus = 'error'})
            .addDefaultCase(() => {})
    }
})

const {actions, reducer} = filterSlice

export const {selectAll} = filtersAdapter.getSelectors(state => state.filters)

export default reducer
export const {
    filtersFetching,
    filtersFetched,
    filtersFetchingError,
    activeFilterChanged
} = actions;