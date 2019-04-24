/* eslint-disable no-undef */


export const LoadJSON = () => {
    return new Promise((resolve, reject) => {
        var xobj = new XMLHttpRequest();
        xobj.overrideMimeType("application/json");
        xobj.open('GET', './assets/data.json', true);
        xobj.onreadystatechange = () => {
            if (xobj.readyState == 4) {
                if (xobj.status == 200)
                    resolve(JSON.parse(xobj.responseText));
                else
                    reject("Error loading page\n");
            }
        };
        xobj.ontimeout = function () {
            reject('timeout');
        };
        xobj.send(null);
    });
};

export const GetTemplateRequest = (url) => {
    return new Promise((resolve, reject) => {
      const req = new XMLHttpRequest();
      req.open('GET', url, true);
      req.onreadystatechange = (aEvt) => {
        if (req.readyState == 4) {
          if (req.status == 200)
            resolve(req.responseText);
          else
            reject("Error loading page\n");
  
        }
      };
      req.ontimeout = function () {
        reject('timeout');
      };
      req.send(null);
    });
  };
