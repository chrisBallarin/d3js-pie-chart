import * as d3 from "d3";
import {
    ParseToJson, SumTotalFromObject, NumberWithCommas, PercentOfNums,
    WhiteSpace
} from '../../tools/swisstools';

import { CreateChart } from './d3-charts';

class XChartElement extends HTMLElement {

    constructor(element = null) {

        // Siempre debe llamarse primero al constructor padre
        // eslint-disable-next-line no-console
        console.debug("ready component");
        super();
        element = (!element) ? window.document : element;
        // Se crea el shadow root
        const shadow = this.attachShadow({ mode: 'open' }).innerHTML = `
        <div></div>
      `;
        // get attributes
        const title = this.getAttribute('data-title');
        const array = ParseToJson(this.getAttribute('data-values'));
        const colors = ParseToJson(this.getAttribute('data-colors'));
        const currency = (this.getAttribute('data-currency')) ? this.getAttribute('data-currency') : '';

        this.shadowRoot.appendChild(CreateChart(title, array, colors, currency, element));
    }

}

//customElements.define('chart-component', XChartElement);
export default XChartElement;