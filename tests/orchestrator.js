import retry from "async-retry";

async function waitForAllServices() {
  await waitForWebServer();

  async function waitForWebServer() {
    return retry(
      async () => {
        const response = await fetch("http://localhost:3000/api/v1/status");
        if (!response.ok) {
          throw new Error(`Status ${response.status}`);
        }
      },
      {
        retries: 50,
        maxTimeout: 1000,
      },
    );
  }
}

export default {
  waitForAllServices,
};
