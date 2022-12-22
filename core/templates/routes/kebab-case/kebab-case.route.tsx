// Vendors
import * as React from "react";
import { createRoute } from "@tanstack/react-router";
// Routes
// import { baseRoute } from ".";

const baseRoute = createRoute({ path: "/", component: "Not accessible" });

// Straight from: https://tanstack.com/router/v1/docs/examples/react/kitchen-sink-multi-file?file=src%2Fmain.tsx
export const camelCaseRoute = baseRoute.createRoute({
  path: "kebab-case",
  component: PascalCase,
});

function PascalCase() {
  return (
    <main className="bg-zinc-900">
      <section>Layout A</section>
    </main>
  );
}
