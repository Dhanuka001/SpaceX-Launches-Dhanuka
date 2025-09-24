import { render , screen } from "@testing-library/react"
import App from "./App"
import { expect, test } from "vitest";

test("renders hello world" , () => {
    render(<App/>);
    expect(screen.getByText(/hello/i)).toBeInTheDocument();
});