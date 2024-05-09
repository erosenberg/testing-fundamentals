import { test, expect, type Page } from "@playwright/test";

test("has title", async ({ page }) => {
  await page.goto("http://localhost:5173/clustering/");
  await expect(page).toHaveTitle("Chicago Traffic Accidents Clustering");
});

test("it prints current parameters", async ({ page }) => {
  await page.goto("http://localhost:5173/clustering/?size=1000&distance=450");
  await expect(page.locator("span.size")).toHaveText("1000");
  await expect(page.locator("span.distance")).toHaveText("450");
  await expect(page.locator("span.min-cluster-size")).toHaveText("5");
});

// We can create "Page Objects" that are logical representations of what the page does.
class ClusterPage {
  constructor(private page: any) {}

  // navigation
  async goto({
    size,
    distance,
    minClusterSize,
  }: {
    size?: number;
    distance?: number;
    minClusterSize?: number;
  }) {
    const url = new URL("http://localhost:5173/clustering/");
    if (size) {
      url.searchParams.set("size", size.toString());
    }
    if (distance) {
      url.searchParams.set("distance", distance.toString());
    }
    if (minClusterSize) {
      url.searchParams.set("minClusterSize", minClusterSize.toString());
    }
    await this.page.goto(url.toString());
  }

  get title() {
    return this.page.title();
  }

  get size() {
    return this.page.locator("span.size");
  }

  get distance() {
    return this.page.locator("span.distance");
  }

  get minClusterSize() {
    return this.page.locator("span.min-cluster-size");
  }
}
