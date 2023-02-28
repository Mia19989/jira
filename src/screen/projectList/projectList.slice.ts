import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../store';

interface State {
  /** 创建/编辑项目的弹窗状态 */
  projectModalOpen: boolean;
}

const initialState: State = {
  projectModalOpen: false
}

/** 管理project-list相关的状态 */
export const projectListSlice = createSlice({
  name: 'projectListSlice',
  initialState,
  reducers: {
    openProjectModal: (state) => {
      state.projectModalOpen = true;
    },
    closeProjectModal: (state) => {
      state.projectModalOpen = false;
    }
  }
})

export const projectListActions = projectListSlice.actions;

export const selectProjectModalOpen = (state: RootState) => state.projectList.projectModalOpen;
