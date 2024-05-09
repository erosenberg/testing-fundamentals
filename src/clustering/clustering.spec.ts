import { describe, it } from "vitest";
import { cluster, loadDataset } from "./clustering";

// When working with datasets, try using the smallest sample of data
describe("clustering", () => {
  it("should load data", ({ expect }) => {
    const dataset = loadDataset();
    expect(dataset).toMatchSnapshot();
  });

  it("should create a cluster", ({ expect }) => {
    const dataset = [
      { lat: 0, lng: 0 },
      { lat: 0, lng: 1 },
      { lat: 10, lng: 10 },
      { lat: 11, lng: 11 },
    ];
    const clusters = cluster(dataset, 5, 1);
    console.log(clusters);
    // toEqual is a strict equal, and toMatchObject is partial fields of an object.
    expect(clusters).toMatchObject({
      clusters: [
        {
          data: [
            { lat: 0, lng: 0 },
            { lat: 0, lng: 1 },
          ],
          latMax: 0,
          latMin: 0,
          lngMax: 1,
          lngMin: 0,
        },
        {
          data: [
            { lat: 10, lng: 10 },
            { lat: 11, lng: 11 },
          ],
          latMax: 11,
          latMin: 10,
          lngMax: 11,
          lngMin: 10,
        },
      ],
      // latMax: 11,
      // latMin: 0,
      // lngMax: 11,
      // lngMin: 0,
    });
  });
});
