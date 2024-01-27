import Defines from "../constants/defines";
import Helper from "../helper/helper";

class EventHelper {
  constructor() {}
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
}

export default EventHelper;
