import React from "react";
import { render } from "@testing-library/react";
import NotFoundPage from "pages/not-found/NotFound";

describe("Not found (404) page test", () => {
  test("Page renders properly", () => {
    const { getByText, container } = render(<NotFoundPage />);

    expect(getByText("404")).toBeInTheDocument();
    expect(container.firstChild).toMatchInlineSnapshot(`
      <div>
        404
      </div>
    `);
  });
});
