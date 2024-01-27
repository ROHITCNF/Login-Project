import Defines from "../constants/defines";
import Helper from "../helper/helper";

class EventHelper{
constructor(){
}
 userLoginPrefenceEventExecute () {
    const MobileContainerStatus = Helper.hasClass(
      "mobileNumberContainer",
      "hidden"
    );
    const UserIdContainerStatus = Helper.hasClass(
      "userIdContainer",
      "hidden"
    );

    if (!MobileContainerStatus) {
      Helper.addClass("mobileNumberContainer", "hidden");
      Helper.removeClass("userIdContainer", "hidden");
      Helper.setInnerHtml(
        "UserPrefernceForLogin",
        Defines.userPrefernceMobile
      );
    } else {
      Helper.addClass("userIdContainer", "hidden");
      Helper.removeClass("mobileNumberContainer", "hidden");
      Helper.setInnerHtml(
        "UserPrefernceForLogin",
        Defines.userPrefernceUserId
      );
    }
  };
}


export default EventHelper;
