/* 
functions used for different purposes 
*/


export const ParseToJson = (objText) => {
    return JSON.parse(objText.replace(/'/g, '"'));
};
export const ParseToString = (objText) => {
    return (JSON.stringify(objText)).replace(/"/g, "'");
};

// sum all values comes from object. Check if array contain all numbers
export const SumTotalFromObject = (data) => {
    // convert to array
    const arr = Object.values(data);
    const isNumber = arr.every((element) => (typeof element === 'number'));
    return (isNumber) ? arr.reduce((acc, item) => acc += item, 0) : 0;
};

// number with commas as thousands separators
export const NumberWithCommas = (num, currency = '') => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + currency;
};

// return % of 2 nums
export const PercentOfNums = (wholeNum, numMin) => {
    const result = (numMin * 100) / wholeNum;
    return (result % 1 != 0) ? result.toFixed(1) : result;
};

// repeat string * number of times

export const WhiteSpace = (string, times) => {
    if (times > 0)
        return string.repeat(times);
    else
        return "";

};



