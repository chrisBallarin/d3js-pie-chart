import { CreateChart } from './d3-charts';
import * as d3 from "d3";
/* eslint-disable no-undef */
describe('chart-module/custom-element tests', () => {
    const d3UnitTest = (callback) => {
        var htmlStub = '<html><body></body></html>';
        return jsdom.env({
            features: { QuerySelector: true },
            html: htmlStub,
            done: callback
        });
    };
    const dataFake = { "datapie": { "smartphone": 120000000, "tablet": 480000000 }, "dataline": [{ "description": "smartphone", "data": [{ "x": 0, "y": 3000000 }, { "x": 10, "y": 3200000 }, { "x": 20, "y": 23600000 }, { "x": 30, "y": 1900000 }, { "x": 40, "y": 21850000 }, { "x": 50, "y": 31300000 }, { "x": 60, "y": 21700000 }, { "x": 70, "y": 4200000 }, { "x": 80, "y": 1450000 }, { "x": 90, "y": 1200000 }, { "x": 100, "y": 3900000 }, { "x": 110, "y": 2700000 }] }, { "description": "tablet", "data": [{ "x": 120, "y": 20000000 }, { "x": 130, "y": 25000000 }, { "x": 140, "y": 33000000 }, { "x": 150, "y": 10000000 }, { "x": 160, "y": 35000000 }, { "x": 170, "y": 38000000 }, { "x": 180, "y": 40000000 }, { "x": 190, "y": 35000000 }, { "x": 200, "y": 50000000 }, { "x": 210, "y": 61000000 }, { "x": 220, "y": 68000000 }, { "x": 230, "y": 65000000 }] }] };

    describe("draw chart", () => {
        it("should be define line-clock. It's quarters positions clock's within pie chart", (done) => {

            // Arrange

            const el = window.document;

            // Act

            el.querySelector('body').appendChild(CreateChart("test", dataFake, ['red'], "€", el));
            const chart = d3.select(el).select("#line-clock");

            // Assert

            expect(chart.empty()).toBe(false);
            done();
        });
    });

    describe("draw chart", () => {
        it("should be define legend. It's the area for describe items at bottom", (done) => {

            // Arrange

            const el = window.document;

            // Act

            el.querySelector('body').appendChild(CreateChart("test", dataFake, ['red'], "€", el));
            const chart = d3.select(el).select("#legend");

            // Assert

            expect(chart.empty()).toBe(false);
            done();
        });
    });

    describe("draw chart", () => {
        it("should be define arc. It's the pie chart arc for each item", (done) => {

            // Arrange

            const el = window.document;

            // Act

            el.querySelector('body').appendChild(CreateChart("test", dataFake, ['red'], "€", el));
            const chart = d3.select(el).select("#arc");

            // Assert

            expect(chart.empty()).toBe(false);
            done();
        });
    });
});