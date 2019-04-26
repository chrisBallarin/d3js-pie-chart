/* eslint-disable no-undef */
import * as _ from 'underscore';
import { ParseToString } from '../tools/swisstools';
import { LoadJSON, GetTemplateRequest } from '../service/extdata';
import { } from './chart-component.component.css';
import { tns } from "../../node_modules/tiny-slider/src/tiny-slider";
import {ReorderArrayToChart} from './model/restruture';
// set default's object
let slider = {};
const __x = window.matchMedia("(max-width: 800px)");
//first time
let _cFir = 0;


/* the objective is orginze the array to be readed for d3.
  We need a specific scheme in chart line and pie.
 */


const mobileSup = (x) => {
  if (x.matches) {
    console.log(_cFir);
    if (slider.version != undefined && _cFir > 1) {

      slider.destroy();
    }
    // add carroussel ext lib object options  
    slider = tns({
      container: '.my-slider',
      items: 1,
      center: false,
      mouseDrag: true,
      touch: true,
      swipeAngle: true,
      loop: false,
      edgePadding: 40,
      gutter: 50,
      speed: 400,
      navPosition: "bottom",
      controlsPosition: "bottom"
    });
    _cFir++;
  } else {
    if (slider.version != undefined) {
      slider.destroy();
    }
  }
};

__x.addListener(mobileSup);

export const ChartView = async () => {

  try {
    let data = await LoadJSON();
    // Gets what is inside of the html template (chart-component) 
    // stores the js template function 
    // replaces the template placeholders with what is passed in the object
    const htmlTemp = await GetTemplateRequest('assets/chart-template.html');
    const data_order = ReorderArrayToChart(data);

    const elementDiv = document.createElement('div'); // is a node
    elementDiv.className = "flex-container my-slider";
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

      mobileSup(__x); // Call listener function at run time
    });
  } catch (e) {
    console.error(e);
  }
};



ChartView();