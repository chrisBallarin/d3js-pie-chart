import { LoadJSON, GetTemplateRequest } from '../service/extdata';


/* eslint-disable no-undef */
describe('service/extdata tests', () => {

    describe('LoadJSON', () => {
        it('should return a JSON scheme', async () => {
            // Arrange
            //Act
            expect.assertions(1);
            const data = await LoadJSON();
            //Assert
            expect(data).not.toBeUndefined();
        });
    });
    describe('GetTemplateRequest', () => {
        it('should return a HTML template not undefined', async () => {
            // Arrange
            const url = "assets/chart-template.html";
            //Act
            expect.assertions(1);
            const data = await GetTemplateRequest(url);
            //Assert
            expect(data).not.toBeUndefined();
        });

        it('should return a HTML template chart-component', async () => {
            // Arrange
            const url = "assets/chart-template.html";
            //Act
            expect.assertions(1);
            const data = await GetTemplateRequest(url);
            //Assert
            expect(data).toMatch("chart-component");
        });
        it('should return a HTML template chart-component contain data-title attribute', async () => {
            // Arrange
            const url = "assets/chart-template.html";
            //Act
            expect.assertions(1);
            const data = await GetTemplateRequest(url);
            //Assert
            expect(data).toMatch("data-title");
        });
        it('should return a HTML template chart-component contain data-colors attribute', async () => {
            // Arrange
            const url = "assets/chart-template.html";
            //Act
            expect.assertions(1);
            const data = await GetTemplateRequest(url);
            //Assert
            expect(data).toMatch("data-colors");
        });
        it('should return a HTML template chart-component contain data-values attribute', async () => {
            // Arrange
            const url = "assets/chart-template.html";
            //Act
            expect.assertions(1);
            const data = await GetTemplateRequest(url);
            //Assert
            expect(data).toMatch("data-values");
        });
        it('should return a HTML template chart-component contain data-currency attribute', async () => {
            // Arrange
            const url = "assets/chart-template.html";
            //Act
            expect.assertions(1);
            const data = await GetTemplateRequest(url);
            //Assert
            expect(data).toMatch("data-currency");
        });
    });
});