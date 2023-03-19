import React, { ReactNode } from "react";
import { setupServer } from "msw/node";
import { rest } from "msw";
import { render, screen, waitFor } from "@testing-library/react";
import fakeData from "./fake.json";
import ProjectSys from "../screen/projectList";
import { AppProviders } from "../context";


/** 集成测试 测试 项目列表 */

const apiUrl = process.env.REACT_APP_API_URL;
const fakeAuth = {
  id: 1,
  name: "tom",
  token: "123"
};

const server = setupServer(
  rest.get(`${apiUrl}/me`, (req, res, ctx) => res(ctx.json(fakeAuth))),
  rest.get(`${apiUrl}/users`, (req, res, ctx) => res(ctx.json(fakeData.users))),
  rest.get(`${apiUrl}/projects`, (req, res, ctx) => {
    // 查找project
    const { name = "", personId = undefined } = Object.fromEntries(req.url.searchParams);
    const result = fakeData.projects.filter((project) => {
      // personId存在的话 是查找某个project; 不存在的话,直接返回对应name的project
      return project.name.includes(name) && (personId ? project.personId === +personId : true)
    });

    return res(ctx.json(result));
  })
);

beforeAll(() => server.listen());
// 重置路由
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

// 是否渲染
const waitTable = () => 
waitFor(() => expect(screen.getByText("骑手管理")).toBeInTheDocument(), {
  timeout: 3000,
});

test("项目列表展示正常", async () => {
  renderScreen(<ProjectSys />, { route: "/projects" });
  await waitTable();
  expect(screen.getAllByRole("row").length).toBe(fakeData.projects.length + 1);
});

test("搜索项目", async () => {
  renderScreen(<ProjectSys />, { route: "/projects?name=骑手" });
  await waitTable();
  expect(screen.getAllByRole("row").length).toBe(2);
  expect(screen.getByText("骑手管理")).toBeInTheDocument();
});

export const renderScreen = (ui: ReactNode, { route = "/projects" } = {}) => {
  window.history.pushState({}, "Test page", route);

  return render(<AppProviders>{ui}</AppProviders>);
};
