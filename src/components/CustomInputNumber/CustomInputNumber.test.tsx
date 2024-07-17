import { render, screen } from "@testing-library/react";
import CustomInputNumber from "./index";

it("App Router: Works with Server Components", () => {
  render(<CustomInputNumber />);
  expect(screen.getByRole("heading")).toHaveTextContent("Custom input number");
});
