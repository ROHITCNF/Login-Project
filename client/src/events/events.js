import Helper from "../helper/helper.js";
import EventHelper from "./eventHelper.js";
import Defines from "../constants/defines.js";

class Events {
  constructor() {
    this.registerInitialEvents();
  }
  registerInitialEvents() {
    this.userLoginPrefenceEvent();
    this.LoginButtonClick();
    this.pinSubmitButtonClick();
  }
  userLoginPrefenceEvent() {
    Helper.addEvents(
      Defines.clickForUserPrefernceID,
      "click",
      EventHelper.userLoginPrefenceEventExecute
    );
  }
  LoginButtonClick() {
    Helper.addEvents(
      Defines.loginButtonId,
      "click",
      EventHelper.LoginButtonClickEventExecute
    );
  }
  pinSubmitButtonClick(){
    Helper.addEvents(
      Defines.submitPinButtonId,
      "click",
      EventHelper.pinSubmitButtonClick
    );
  }
}

export default Events;
