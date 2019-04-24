import { ParseToJson, ParseToString, SumTotalFromObject, NumberWithCommas, PercentOfNums, WhiteSpace } from './swisstools';

/* eslint-disable no-undef */
describe('tools/swisstools tests', () => {
    describe('ParseToJson', () => {
        it('should return a structured JSON with right double quote instead single', () => {
            // Arrange
            const nJSON = "[{'name':'test'},{'value':100}]";

            //Act
            const result = ParseToJson(nJSON);

            //Assert
            expect(result).toEqual([{ name: "test" }, { value: 100 }]);
        });
    });
    describe('ParseToString', () => {
        it('should return a string JSON with single  quoate instead single', () => {

            // Arrange
            const nJSON = [{ name: "test" }, { value: 100 }];

            //Act
            const result = ParseToString(nJSON);

            //Assert
            expect(result).toMatch("[{'name':'test'},{'value':100}]");

        });

    });
    describe('SumTotalFromObject', () => {
        it('should return a sum for all numbers within an array previously converted from object', () => {

            // Arrange
            const sum = { smartphone: 80000, tablet: 120000 };

            //Act
            const result = SumTotalFromObject(sum);

            //Assert
            expect(result).toEqual(200000);

        });
        it('should return 0 due contain a string value from object :  wrong num', () => {

            // Arrange
            const sum = { smartphone: 80000, tablet: 120000, cycle: '3000' };

            //Act
            const result = SumTotalFromObject(sum);

            //Assert
            expect(result).toEqual(0);

        });

        describe('NumberWithCommas', () => {
            it('should return an string from a number. It has to be as number with commas as thousands separators', () => {
                // Arrange
                const num = 100000000;

                //Act
                const result = NumberWithCommas(num);

                //Assert
                expect(result).toMatch("100.000.000");
            });
        });
        describe('PercentOfNums', () => {
            it('should return % of 2 nums. Only shows decimals if it´s needed so no with .0. Case decimal number', () => {
                // Arrange
                const wholeNum = 450;
                const numMin = 50;

                //Act
                const result = PercentOfNums(wholeNum, numMin);

                //Assert
                expect(result).toMatch("11.1");
            });
            it('should return % of 2 nums. Only shows decimals if it´s needed so no with .0. Case whole number', () => {
                // Arrange
                const wholeNum = 100;
                const numMin = 50;

                //Act
                const result = PercentOfNums(wholeNum, numMin);

                //Assert
                expect(result).toBe(50);
            });
        });
        describe('WhiteSpace', () => {
            it('should repeat a string * number of times', () => {
                // Arrange
                const string = "\u00A0";

                //Act
                const result = WhiteSpace(string, 5);

                //Assert
                expect(result).toEqual("\u00A0\u00A0\u00A0\u00A0\u00A0");
            });
        });
    });
});