import { renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import useTimeInterval from "./useTimeInterval";

describe("useTimeInterval hook", () => {
  it("should check the time interval calculations", () => {
    const { result } = renderHook(() =>
      useTimeInterval({
        task: [
          {
            description: "project 1 description",
            id: -0.1700944822244761,
            status: "completed",
            task: "task1",
            time: "2024-11-20T10:14",
            userId: 1731558110081,
          },
          {
            description: "project 2 description",
            id: -0.1700944822244763,
            status: "pending",
            task: "task2",
            time: "2024-11-20T10:14",
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
        ],
      })
    );

    expect(result.current.tasks[0].status).toBe("completed");
    expect(result.current.tasks[1].status).toBe("pending");
    expect(result.current.tasks[2].status).toBe("pending");
  });
});
