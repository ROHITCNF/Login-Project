import Defines from "../constants/defines";
import Helper from "../helper/helper";

class EventHelper {
  constructor() {
    this.loginSuccessFlag = true;
  }
  static userLoginPrefenceEventExecute() {
    const MobileContainerStatus = Helper.hasClass(
      Defines.mobileNumberContainerID,
      Defines.hiddenClassName
    );
    const UserIdContainerStatus = Helper.hasClass(
      Defines.userIdContainerID,
      Defines.hiddenClassName
    );

    if (!MobileContainerStatus) {
      Helper.addClass(Defines.mobileNumberContainerID, Defines.hiddenClassName);
      Helper.removeClass(Defines.userIdContainerID, Defines.hiddenClassName);
      Helper.setInnerHtml(
        Defines.UserPrefernceForLoginID,
        Defines.userPrefernceMobile
      );
    } else {
      Helper.addClass(Defines.userIdContainerID, Defines.hiddenClassName);
      Helper.removeClass(
        Defines.mobileNumberContainerID,
        Defines.hiddenClassName
      );
      Helper.setInnerHtml(
        Defines.UserPrefernceForLoginID,
        Defines.userPrefernceUserId
      );
    }
  }
  static LoginButtonClickEventExecute() {
    //hide the Login and unhide the pin section
    Helper.addClass(Defines.loginFormId, Defines.hiddenClassName);
    Helper.removeClass(Defines.pinSectionId, Defines.hiddenClassName);
  }

  static pinSubmitButtonClick() {
    //hide pin section and unhide the success section
    const loginFlag = true;
    Helper.addClass(Defines.pinSectionId, Defines.hiddenClassName);
    if (loginFlag) {
      Helper.removeClass(Defines.successScreenId, Defines.hiddenClassName);
    } else {
      Helper.removeClass(Defines.errorScreenId, Defines.hiddenClassName);
      setTimeout(() => {
        //Take the user to main login Page .
        //and do all the needful ->>> means hide all sections, and unhide login section only
        Helper.addClass(Defines.errorScreenId, Defines.hiddenClassName);
        Helper.removeClass(Defines.loginFormId, Defines.hiddenClassName);
      }, 5000);
    }
  }
}

export default EventHelper;
