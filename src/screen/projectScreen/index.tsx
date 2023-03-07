import React from "react";
import { Link } from "react-router-dom";
import { Routes, Route, Navigate } from "react-router";
import KanBan from "../kanban";
import Epic from "../epic";

export const ProjectScreen = () => {
  return (
    <>
      <h1>ProjectScreen</h1>
      <div>
        <Link to={'kanban'}>看板</Link>
      </div>
      <div>
        <Link to={'epic'}>任务组</Link>
      </div>

      <Routes>
        <Route path="kanban" element={<KanBan/>}></Route>
        <Route path="epic" element={<Epic/>}></Route>
        <Route path="*" element={<Navigate to="kanban" replace={true} />}></Route>
      </Routes>
    </>
  )
};
