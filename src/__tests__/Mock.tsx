import React from "react";
import { render, screen } from "@testing-library/react";
import { Mark } from "../components/Mark";

test("Mark组件正确高亮关键词", () => {
  const name = "医疗健康";
  const keyword = "健康";

  render(<Mark name={name} keyword={keyword} />);

  // 测试是否渲染
  expect(screen.getByText(keyword)).toBeInTheDocument();
  // 测试高亮的颜色
  expect(screen.getByText(keyword)).toHaveStyle('color: #257AFD');
  // 测试非检索词没有高亮
  expect(screen.getByText("医疗")).not.toHaveStyle('color: #257AFD');
  
})