import { describe, expect, it, mock } from "bun:test";
import { tryCatch } from ".";

describe("Promise", async () => {
  it("Should be awaited", async () => {
    const val = "mocked";
    const mocked = mock(async () => {
      return val;
    });

    const [data, error] = await tryCatch(mocked);
    expect(data).toBe(val);
    expect(mocked.mock.calls.length).toBe(1);
    tryCatch(mocked);
    expect(mocked.mock.calls.length).toBe(2);
  });
});

describe("Function", () => {
  it("Should be executed once per call", () => {
    const val = "mocked";
    const mocked = mock(() => {
      return val;
    });

    const [data, error] = tryCatch(mocked);
    expect(data).toBe(val);
    expect(mocked.mock.calls.length).toBe(1);
    tryCatch(mocked);
    expect(mocked.mock.calls.length).toBe(2);
  });
});
