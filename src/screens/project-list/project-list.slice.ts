import { createSlice } from "@reduxjs/toolkit"
import { stat } from "fs"
import { RootState } from "store"

interface State {
    projectModalOpen: boolean
}

const initialState: State = {
    projectModalOpen:false
}

export const projectListSlice = createSlice({
    name: 'perojectListSilce',
    initialState,
    reducers: {
        openProjectModal(state) {
            state.projectModalOpen = true
        },
        closeProjectModal(state) {
            state.projectModalOpen = false
        }
    }
})

export const projectListActions = projectListSlice.actions

export const selectProjectModalOpen = (state:RootState) => state.projectList.projectModalOpen