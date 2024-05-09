import { test, expect, type Page } from "@playwright/test";

test("has title", async ({ page }) => {
  const clusterPage = new ClusterPage(page);
  await clusterPage.goto();
  await expect(clusterPage.title).resolves.toMatch(
    "Chicago Traffic Accidents Clustering"
  );
});

test("it prints current parameters", async ({ page }) => {
  const clusterPage = new ClusterPage(page);
  await clusterPage.goto({ distance: 450, size: 1000, minClusterSize: 5 });
  await expect(clusterPage.size).toHaveText("1000");
  await expect(clusterPage.distance).toHaveText("450");
  await expect(clusterPage.minClusterSize).toHaveText("5");
});

test("it should print validation errors when out of bound parameters are passed in", async ({
  page,
}) => {
  const clusterPage = new ClusterPage(page);
  await clusterPage.goto();
  clusterPage.setDistance(1);
  clusterPage.submit();
  await expect(clusterPage.distanceError).toHaveText(
    "Distance must be at least 100"
  );
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
  } = {}) {
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

  async setDistance(distance: number) {
    await this.page.fill("input[name=distance]", distance.toString());
  }

  get distanceError() {
    return this.page.locator(".error.distance");
  }

  async submit() {
    return this.page.click("button[type='submit']");
  }
}
