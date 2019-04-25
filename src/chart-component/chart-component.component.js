/* eslint-disable no-undef */
import * as _ from 'underscore';
import { ParseToString } from '../tools/swisstools';
import { LoadJSON, GetTemplateRequest } from '../service/extdata';
import { } from './chart-component.component.css';

export const ChartView = async () => {

  try {
    let data = await LoadJSON();
    // Gets what is inside of the html template (chart-component) 
    // stores the js template function 
    // replaces the template placeholders with what is passed in the object
    const htmlTemp = await GetTemplateRequest('assets/chart-template.html');
    const data_order = ReorderArrayToChart(data);

    const elementDiv = document.createElement('div'); // is a node
    elementDiv.className = "flex-container";
    document.body.appendChild(elementDiv);

    // iterate all components #revenue, #impresions, #visits 
    data_order.forEach(el => {
      // Test Object for template (create class object)
      const nData = ParseToString(el.data);
      const nColors = ParseToString(el.colors);
      const object = {
        title: el.description,
        data: nData,
        colors: nColors,
        currency: el.currency
      };


      const parser = new DOMParser();
      const doc = parser.parseFromString(htmlTemp, "text/html");

      const templateSelector = doc.querySelector('#chart-container');
      const templateString = templateSelector.innerHTML;

      const template = _.template(templateString);
      const temp = template(object);

      const elementDivCh = document.createElement('div'); // is a node
      elementDivCh.innerHTML = temp;
      elementDiv.appendChild(elementDivCh);

    });
  } catch (e) {
    console.error(e);
  }
};



/* the objective is orginze the array to be readed for d3.
  We need a specific scheme in chart line and pie.
 */

export const ReorderArrayToChart = (arr) => {
  // for pie

  const nArray = [];
  let _objPie = {};
  let _objLineMonth = [];
  let _objLine = [];
  let _objColor = [];

  arr.forEach((element) => {
    const isNObj = nArray.find(k => k.description === element.description);
    if (!isNObj) {
      // empty object
      _objPie = {};
      _objLine = [];
      _objColor = [];
      let sumX = 0;

      element.data.map(element2 => {
        _objLineMonth = [];
        let sumValue = 0;
        element2.data.map(element3 => {
          _objLineMonth.push({
            x: sumX,
            y: element3.value
          });
          // create line
          sumX += 10;
          // sum for pie 
          sumValue += element3.value;
        });

        _objLine.push(
          {
            description: element2.name,
            data: _objLineMonth
          }
        );
        _objPie = Object.assign(_objPie, { [element2.name]: sumValue });
        _objColor.push(element2.color);
      });
      nArray.push({
        description: element.description,
        data: {
          datapie: _objPie,
          dataline: _objLine
        },
        colors: _objColor,
        currency: element.currency
      });
    }
  });
  return nArray;

};


ChartView();