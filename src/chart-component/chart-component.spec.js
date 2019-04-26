/* eslint-disable no-undef */

import { ReorderArrayToChart } from './model/restruture';
import { LoadJSON } from '../service/extdata';

describe('chart-component/chart-component.component tests', () => {

    describe("test JSON scheme for charts (pie,line)", () => {

        it("should return reordered scheme. matching datapie object from local JSON ", async () => {
            // Arrange
            const json = await LoadJSON();
            // Act
            const result = ReorderArrayToChart(json);

            // Assert
            expect(result[0].data.datapie).not.toBeUndefined();

        });

        it("should return reordered scheme. matching dataline array from local JSON ", async () => {
            // Arrange
            const json = await LoadJSON();

            // Act
            const result = ReorderArrayToChart(json);

            // Assert
            expect(result[0].data.dataline.length).toBeGreaterThan(0);

        });
    });
});