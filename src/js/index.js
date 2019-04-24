import { charts } from '../chart-module/index';
import { } from '../style/global.css';
import { loadJSON } from '../service/extdata';
import { ChartView } from '../chart-component/chart-component.component';

(() => {
    document.addEventListener('DOMContentLoaded', (event) => {
        charts();
    });
})();