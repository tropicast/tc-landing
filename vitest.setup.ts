import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import { afterEach } from "vitest";

// Testing Library cleans up by itself only with Vitest globals, which this project does not use.
afterEach(cleanup);
