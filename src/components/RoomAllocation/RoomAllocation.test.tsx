import { render, screen } from "@testing-library/react";
import RoomAllocation from "./index";

it("App Router: Works with Server Components", () => {
  render(<RoomAllocation />);
  expect(screen.getByRole("heading")).toHaveTextContent("Room Allocation");
});
