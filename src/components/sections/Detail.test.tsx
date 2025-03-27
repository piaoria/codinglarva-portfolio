/* eslint-disable quotes */
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import Detail from "./Detail";

describe("Detail 컴포넌트", () => {
  it("카드를 클릭하면 테두리가 나타나고 다시 클릭하면 사라진다", () => {
    render(<Detail />);

    // Team 카드 찾기
    const teamCard = screen
      .getByText("TEAM")
      .closest('div[data-clickable="true"]');

    // 초기 상태에서는 테두리가 없어야 함
    expect(teamCard).not.toHaveClass("ring-2");

    // 카드 클릭
    fireEvent.click(teamCard!);

    // 클릭 후 테두리가 나타나야 함
    expect(teamCard).toHaveClass("ring-2");

    // 다시 클릭
    fireEvent.click(teamCard!);

    // 다시 클릭 후 테두리가 사라져야 함
    expect(teamCard).not.toHaveClass("ring-2");
  });

  it("여러 카드를 클릭해도 각각 독립적으로 동작한다", () => {
    render(<Detail />);

    // Team과 Idea 카드 찾기
    const teamCard = screen
      .getByText("TEAM")
      .closest('div[data-clickable="true"]');
    const ideaCard = screen
      .getByText("IDEA")
      .closest('div[data-clickable="true"]');

    // Team 카드 클릭
    fireEvent.click(teamCard!);
    expect(teamCard).toHaveClass("ring-2");
    expect(ideaCard).not.toHaveClass("ring-2");

    // Idea 카드 클릭
    fireEvent.click(ideaCard!);
    expect(teamCard).toHaveClass("ring-2");
    expect(ideaCard).toHaveClass("ring-2");

    // Team 카드 다시 클릭
    fireEvent.click(teamCard!);
    expect(teamCard).not.toHaveClass("ring-2");
    expect(ideaCard).toHaveClass("ring-2");
  });
});
