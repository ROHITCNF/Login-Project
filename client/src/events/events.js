import Helper from "../helper/helper.js";
import EventHelper from "./eventHelper.js";
import Defines from "../constants/defines.js";

class Events {
  constructor(){
    this.registerInitialEvents();
  }
  registerInitialEvents() {
    this.userLoginPrefenceEvent();
  }
  userLoginPrefenceEvent() {
    Helper.addEvents(
      Defines.clickForUserPrefernceID,
      "click",
      EventHelper.userLoginPrefenceEventExecute
    );
  }
}

export default Events;
