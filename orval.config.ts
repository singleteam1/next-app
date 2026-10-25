import { config } from "dotenv";
import { defineConfig } from "orval";

config({ path: ".env" });
const input = process.env.OPENAPI_URL || "http://localhost:8000/spec.json";

export default defineConfig({
  api: {
    input: {
      target: input,
      override: {
        transformer: (spec) => ({ ...spec, openapi: "3.1.0" }),
      },
    },
    output: {
      mode: "split",
      target: "./generated/api/endpoints.ts",
      schemas: "./generated/api/model",
      client: "react-query",
      httpClient: "axios",
      override: {
        mutator: {
          path: "./src/lib/api/client.ts",
          name: "customInstance",
        },
      },
    },
  },
});
