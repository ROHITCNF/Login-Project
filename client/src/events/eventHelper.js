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
  static async LoginButtonClickEventExecute(event) {
    event.preventDefault();
    const mobileOrEmail = document.getElementById("mobile").value;
    const passwordVal = document.getElementById("password").value;
    document.getElementById("mobile").value = "";
    document.getElementById("password").value = "";
    console.log(mobileOrEmail, passwordVal);
     const data = { mobile: mobileOrEmail, password: passwordVal };
    const ApiData = await Helper.callAPI(Defines.loginAPi, "POST", data);
    if(ApiData?.code === 200){
      Helper.addClass(Defines.loginFormId, Defines.hiddenClassName);
      Helper.removeClass(Defines.pinSectionId, Defines.hiddenClassName);
    }
    /*
     Get the input from the Login inputs and call the login API.
     On the successfull response get Do the following Operations
    */

    //hide the Login and unhide the pin section

  
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
