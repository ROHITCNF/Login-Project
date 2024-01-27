import Helper from "../helper/helper.js";
import EventHelper from "./eventHelper.js";

class Events {
  constructor(){
    this.registerInitialEvents();
  }
  registerInitialEvents() {
    this.userLoginPrefenceEvent();
  }
  userLoginPrefenceEvent() {
    Helper.addEvents(
      "clickForUserPrefernce",
      "click",
      EventHelper.prototype.userLoginPrefenceEventExecute
    );
  }
}

export default Events;
