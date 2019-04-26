import { } from './index.css';
import XChartElement from './models/custom-element';

export const charts = () => {
    // load view component
    // eslint-disable-next-line no-console
    console.info("loading module chart");
    customElements.define('chart-component', XChartElement);
};

