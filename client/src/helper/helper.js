class Helper {
  static getElementWithId(idName) {
    return document.getElementById(idName);
  }
  static getInnerHtml(idName) {
    const element = this.getElementWithId(idName);
    return element.innerHTML();
  }
  static setInnerHtml(idName, html) {
    const element = this.getElementWithId(idName);
    element.innerHTML = html;
  }
  static classList(idName) {
    return this.getElementWithId(idName).classList;
  }
  static hasClass(idName, className) {
    return this.classList(idName).contains(className);
  }
  static addClass(idName, className) {
    this.getElementWithId(idName).classList.add(className);
  }
  static removeClass(idName, className) {
    this.getElementWithId(idName).classList.remove(className);
  }
  static addEvents(idName, eventname, callBackFunction) {
    this.getElementWithId(idName).addEventListener(eventname, callBackFunction);
  }

  //API call
 static async callAPI(URL,methodType,data=undefined) {
  try {
    let options = {
      method: methodType,
      headers: {
        "Content-Type": "application/json",
      },
    };

    if (methodType === "POST" && data) {
      options.body = JSON.stringify(data);
    }

    let responseData = await fetch(URL, options);
    let parsedResponse = await responseData.json();
    return parsedResponse;
  } catch (error) {
    console.log('Error:', error.message);
  }
};
}

export default Helper;
