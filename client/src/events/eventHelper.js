import Defines from "../constants/defines";
import Helper from "../helper/helper";

class EventHelper {
  constructor() {
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
    Helper.resetLoginInputBox();
  }

  static async LoginButtonClickEventExecute(event) {
    event.preventDefault();
    const mobileNumber = Helper.getInputBoxValue(Defines.mobileInputId);
    const emailId = Helper.getInputBoxValue(Defines.userIdInputId);
    const passwordVal = Helper.getInputBoxValue("password");
    Helper.resetLoginInputBox();
    console.log(mobileNumber, emailId, passwordVal);
    const data = {
      mobile: mobileNumber,
      email: emailId,
      password: passwordVal,
    };
    const ApiData = await Helper.callAPI(Defines.loginAPi, "POST", data);
    if (ApiData?.code === 200) {
      //SomeHow save the data
      Defines.userEmail = ApiData.data.emailId;
      Helper.addClass(Defines.loginFormId, Defines.hiddenClassName);
      Helper.removeClass(Defines.pinSectionId, Defines.hiddenClassName);
    }
    /*
     Get the input from the Login inputs and call the login API.
     On the successfull response get Do the following Operations
    */

    //hide the Login and unhide the pin section
  }

  static async pinSubmitButtonClick(event) {
    event.preventDefault();
    const userPin = Helper.getInputBoxValue(Defines.pinInputId);
    const data = {
      email: Defines.userEmail,
      pin: userPin,
    };
    Defines.userEmail="";
    const ApiData = await Helper.callAPI(Defines.pinApi, "POST", data);
    //Hide the Pin container so that we can show Success or failed popup
    Helper.addClass(Defines.pinSectionId, Defines.hiddenClassName);

    if (ApiData?.code === 200) {
      Helper.removeClass(Defines.successScreenId, Defines.hiddenClassName);
    } else {
      Helper.removeClass(Defines.errorScreenId, Defines.hiddenClassName);
      setTimeout(() => {
        //Take the user to main login Page .
        Helper.addClass(Defines.errorScreenId, Defines.hiddenClassName);
        Helper.removeClass(Defines.loginFormId, Defines.hiddenClassName);
      }, 5000);
    }
  }
}

export default EventHelper;
