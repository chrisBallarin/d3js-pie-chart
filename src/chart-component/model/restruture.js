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