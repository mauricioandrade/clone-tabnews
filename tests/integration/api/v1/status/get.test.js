import orchestrator from "tests/orchestrator.js";

beforeAll(async () => {
  await orchestrator.waitForAllServices();
});

test("GET to /api/v1/status should return 200", async () => {
  const response = await fetch("http://localhost:3000/api/v1/status");

  expect(response.status).toBe(200);
  expect(response.headers.get("Content-Type")).toContain("application/json");

  const responseBody = await response.json();

  const updatedAt = new Date(responseBody.updated_at);
  expect(updatedAt.toISOString()).toEqual(responseBody.updated_at);
  expect(Date.now() - updatedAt).toBeLessThan(5000);

  expect(typeof responseBody.dependencies.database.version).toBe("string");
  expect(responseBody.dependencies.database.max_connections).toBeGreaterThan(0);
  expect(
    responseBody.dependencies.database.opened_connections,
  ).toBeGreaterThanOrEqual(1);
});
