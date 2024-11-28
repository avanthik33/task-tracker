import { describe, expect, it } from "vitest";
import { useTimeInterval } from "../hooks/useTimeInterval";
import { renderHook } from "@testing-library/react";

describe("useTimeInterval hook", () => {
  const tasks = [
    {
      description: "project 1 description",
      id: -0.1700944822244761,
      status: "completed",
      task: "task1",
      time: "2024-11-18T10:14",
      userId: 1731558110081,
    },
    {
      description: "project 3 description",
      id: -0.1700944822244762,
      status: "pending",
      task: "task3",
      time: "2024-11-18T10:14",
      userId: 1731558110081,
    },
    {
      description: "project 2 description",
      id: -0.1700944822244763,
      status: "pending",
      task: "task2",
      time: "2025-11-18T10:14",
      userId: 1731558110081,
    },
  ];
  it("Should return tasks ", () => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
    const { result } = renderHook(() =>
      useTimeInterval({
        task: tasks,
      })
    );

    expect(result.current.tasks[0].status).toBe("completed");
    expect(result.current.tasks[1].status).toBe("timeout");
    expect(result.current.tasks[2].status).toBe("pending");
  });
});
