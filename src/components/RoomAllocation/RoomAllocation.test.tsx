import { render, screen } from "@testing-library/react";
import RoomAllocation from "./index";

it("App Router: Works with Server Components", () => {
  render(<RoomAllocation guest={{ adult: 0, child: 0 }} rooms={[]} />);
  expect(screen.getByRole("heading")).toHaveTextContent("住客人數：");
});
