import { Component } from "react";
import { Link } from "react-router-dom";
import BASE_URL from "../../constants";
import "./index.css";

class RegistrationForm extends Component {
  state = {
    otp: "",
    nameInput: "",
    mailInput: "",
    showNameError: false,
    showMailError: false,
    isFormSubmitted: false,
    usernameInput: "",
    showUserNameError: false,
    passwordInput: "",
    confirmPasswordInput: "",
    showPasswordError: false,
    showWrongOTPError: false,
    showConfirmPasswordError: false,
    showUserExistsError: false,
    showMailExistsError: false,
    isValidOtp: false,
  };

  sendOtp = async (mailInput) => {
    const url = BASE_URL+"otp";
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ mailId: mailInput }),
    };
    const result = await fetch(url, options);
    const randomOTP = await result.json();
    console.log(randomOTP.otp);
    this.setState({ otp: randomOTP.otp });
  };

  onBlurMail = async () => {
    const isValidMail = this.validateMail();
    let isValidMailExists = true;
    if (isValidMail) {
      isValidMailExists = await this.validateMailExists();
    }

    this.setState({
      showMailError: !isValidMail,
      showMailExistsError: !isValidMailExists,
    });

    this.setState({ showMailError: !isValidMail });
  };

  onChangeMail = (event) => {
    const { target } = event;
    const { value } = target;

    this.setState({
      mailInput: value,
    });
  };

  renderMailField = () => {
    const { mailInput, showMailError } = this.state;
    const className = showMailError
      ? "name-input-field error-field"
      : "name-input-field";

    return (
      <div className="input-container">
        <label className="input-label" htmlFor="mailId">
          Email
        </label>
        <input
          type="text"
          id="mailId"
          className={className}
          value={mailInput}
          placeholder="mail-id"
          onChange={this.onChangeMail}
          onBlur={this.onBlurMail}
        />
      </div>
    );
  };

  onBlurName = () => {
    const isValidName = this.validateName();

    this.setState({ showNameError: !isValidName });
  };

  onChangeName = (event) => {
    const { target } = event;
    const { value } = target;

    this.setState({
      nameInput: value,
    });
  };

  onChangeUserName = (event) => {
    const { value } = event.target;
    this.setState({ usernameInput: value });
  };
  onBlurUserName = async (event) => {
    const isValidUserName = this.validateUserName();
    let isValidUserExists = true;
    if (isValidUserName) {
      isValidUserExists = await this.validateUserExists();
    }

    this.setState({
      showUserNameError: !isValidUserName,
      showUserExistsError: !isValidUserExists,
    });
  };
  onChangePassword = (event) => {
    const { value } = event.target;
    this.setState({ passwordInput: value });
  };
  onBlurPassword = (event) => {
    const isValidPassword = this.validatePassword();
    this.setState({ showPasswordError: !isValidPassword });
  };

  onChangeConfirmPassword = (event) => {
    const { value } = event.target;
    this.setState({ confirmPasswordInput: value });
  };
  onBlurConfirmPassword = (event) => {
    const isValidConfirmPassword = this.validateConfirmPassword();
    this.setState({ showConfirmPasswordError: !isValidConfirmPassword });
  };

  renderNameField = () => {
    const { nameInput, showNameError } = this.state;
    const className = showNameError
      ? "name-input-field error-field"
      : "name-input-field";

    return (
      <div className="input-container">
        <label className="input-label" htmlFor="name">
          NAME
        </label>
        <input
          type="text"
          id="name"
          className={className}
          value={nameInput}
          placeholder="Your Name"
          onChange={this.onChangeName}
          onBlur={this.onBlurName}
        />
      </div>
    );
  };

  renderUserNameField = () => {
    const { usernameInput, showUserNameError, showUserExistsError } =
      this.state;
    const className =
      showUserNameError || showUserExistsError
        ? "name-input-field error-field"
        : "name-input-field";
    return (
      <div className="input-container">
        <label className="input-label" htmlFor="username">
          USERNAME
        </label>
        <input
          type="text"
          id="username"
          className={className}
          value={usernameInput}
          placeholder="Username"
          onChange={this.onChangeUserName}
          onBlur={this.onBlurUserName}
        />
      </div>
    );
  };
  renderPasswordField = () => {
    const { passwordInput, showPasswordError } = this.state;
    const className = showPasswordError
      ? "name-input-field error-field"
      : "name-input-field";
    return (
      <div className="input-container">
        <label className="input-label" htmlFor="password">
          Password
        </label>
        <input
          type="password"
          id="password"
          className={className}
          value={passwordInput}
          placeholder="Password"
          onChange={this.onChangePassword}
          onBlur={this.onBlurPassword}
        />
      </div>
    );
  };

  renderConfirmPasswordField = () => {
    const { confirmPasswordInput, showConfirmPasswordError } = this.state;
    const className = showConfirmPasswordError
      ? "name-input-field error-field"
      : "name-input-field";
    return (
      <div className="input-container">
        <label className="input-label" htmlFor="confirmPassword">
          Confirm Password
        </label>
        <input
          type="password"
          id="confirmPassword"
          className={className}
          value={confirmPasswordInput}
          placeholder=""
          onChange={this.onChangeConfirmPassword}
          onBlur={this.onBlurConfirmPassword}
        />
      </div>
    );
  };

  validateMail = () => {
    const { mailInput } = this.state;

    return mailInput !== "";
  };
  validateMailExists = async () => {
    const { mailInput } = this.state;
    const url =
      BASE_URL+"userDetails/mails/" + mailInput;
    const options = {
      method: "GET",
    };
    let result = await fetch(url, options);
    let data = await result.json();
    return data.length === 0;
  };

  validateName = () => {
    const { nameInput } = this.state;

    return nameInput !== "";
  };
  validateUserName = () => {
    const { usernameInput } = this.state;
    return usernameInput !== "";
  };
  validateUserExists = async () => {
    const { usernameInput } = this.state;
    const url = BASE_URL+"userDetails/" + usernameInput;
    const options = {
      method: "GET",
    };
    let result = await fetch(url, options);
    let data = await result.json();
    return data.length === 0;
  };
  validatePassword = () => {
    const numbers = "0123456789";
    const { passwordInput } = this.state;
    let isDigit = false;
    let isChar = false;
    let isSpecial = false;
    for (let i = 0; i < passwordInput.length; i++) {
      if (passwordInput[i].toLowerCase() !== passwordInput[i].toUpperCase()) {
        isChar = true;
      } else if (numbers.includes(passwordInput[i])) {
        isDigit = true;
      } else {
        isSpecial = true;
      }
    }
    if (isDigit && isChar && isSpecial) {
      return true;
    }
    return false;
  };
  validateConfirmPassword = () => {
    const { passwordInput, confirmPasswordInput } = this.state;
    return passwordInput === confirmPasswordInput;
  };
  validateOtp = async (event) => {
    const { otp } = this.state;
    const value = document.getElementById("otp").value;
    console.log("startedotp", otp, value, "otpgen");
    if (otp === parseInt(value)) {
      const { usernameInput, nameInput, mailInput, passwordInput } = this.state;
      const userDetails = {
        username: usernameInput,
        mailId: mailInput,
        name: nameInput,
        password: passwordInput,
      };
      const url = BASE_URL+"register/";
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userDetails),
      };
      await fetch(url, options);

      this.setState({ isValidOtp: true, showWrongOTPError: true });
    } else {
      this.setState({ showWrongOTPError: true });
    }
  };
  sendAndValidateOTP = async (event) => {
    document.getElementById("otp").value = "";
    const { mailInput } = this.state;
    this.sendOtp(mailInput);
    this.setState({ showWrongOTPError: false });
  };
  onSubmitForm = async (event) => {
    event.preventDefault();
    const { mailInput } = this.state;
    const isValidName = this.validateName();
    const isValidMail = this.validateMail();
    const isValidUserName = this.validateUserName();
    const isValidPassword = this.validatePassword();
    const isValidConfirmPassword = this.validateConfirmPassword();
    const isValidUserExists = await this.validateUserExists();

    if (
      isValidUserExists &&
      isValidName &&
      isValidMail &&
      isValidUserName &&
      isValidPassword &&
      isValidConfirmPassword
    ) {
      this.sendOtp(mailInput);

      this.setState({ isFormSubmitted: true });
    } else {
      this.setState({
        showNameError: !isValidName,
        showMailError: !isValidMail,
        showUserNameError: !isValidUserName,
        showPasswordError: !isValidPassword,
        showConfirmPasswordError: !isValidConfirmPassword,
        showUserExistsError: !isValidUserExists,
        isFormSubmitted: false,
      });
    }
  };

  renderRegistrationForm = () => {
    const {
      showNameError,
      showMailError,
      showUserNameError,
      showPasswordError,
      showConfirmPasswordError,
      showUserExistsError,
      showMailExistsError,
    } = this.state;

    return (
      <form className="form-container" onSubmit={this.onSubmitForm}>
        {this.renderNameField()}
        {showNameError && <p className="error-message">Required</p>}
        {this.renderMailField()}
        {showMailError && <p className="error-message">Required</p>}
        {showMailExistsError && (
          <p className="error-message">Mail Already Exists</p>
        )}
        {this.renderUserNameField()}
        {showUserNameError && <p className="error-message">Required</p>}
        {showUserExistsError && (
          <p className="error-message">Username already exists</p>
        )}
        {this.renderPasswordField()}
        {showPasswordError && (
          <p className="error-message">
            Password should consist of atleast one digit,letter and one special
            character
          </p>
        )}
        {this.renderConfirmPasswordField()}
        {showConfirmPasswordError && (
          <p className="error-message">Passwords didn't match</p>
        )}
        <button type="submit" className="submit-button">
          Next
        </button>
      </form>
    );
  };

  renderOtpPage = () => {
    const { mailInput, showWrongOTPError } = this.state;

    let res = "";
    for (let i = 0; i < mailInput.length; i++) {
      if (mailInput[i] === "@") {
        break;
      }
      res = res + mailInput[i];
    }
    console.log(mailInput, res);
    const mailLength = res.length;
    const otpText =
      "We have sent you an OTP to " +
      "***" +
      res.slice(mailLength - 3, mailLength) +
      "@gmail.com";
    return (
      <div className="input-container">
        <div>
          <p className="input-label" style={{ fontSize: "15px" }}>
            {otpText}
          </p>
        </div>
        <input
          type="text"
          id="otp"
          className="name-input-field"
          placeholder="Enter the OTP"
        />
        {showWrongOTPError && (
          <p className="error-message">You have entered the OTP wrong </p>
        )}
        <button
          type="button"
          className="submit-button"
          onClick={this.validateOtp}
        >
          Verify
        </button>
        {showWrongOTPError && (
          <p
            style={{ cursor: "pointer" }}
            className="error-message"
            onClick={this.sendAndValidateOTP}
          >
            Resend Code ?
          </p>
        )}
      </div>
    );
  };

  onClickSubmitAnotherResponse = () => {
    this.setState((prevState) => ({
      isFormSubmitted: !prevState.isFormSubmitted,
      nameInput: "",
      mailInput: "",
      passwordInput: "",
      confirmPasswordInput: "",
      usernameInput: "",
    }));
  };

  renderSubmissionSuccessView = () => {
    alert("Successfully Created");
    return (
      <>
        <img
          src="https://assets.ccbp.in/frontend/react-js/success-icon-img.png"
          alt="success"
          className="success-image"
        />
        <p>Account Created Successfully</p>
        <Link
          to="/login"
          type="button"
          className="submit-button"
          onClick={this.onClickSubmitAnotherResponse}
        >
          Login
        </Link>
      </>
    );
  };

  render() {
    const { isFormSubmitted, isValidOtp } = this.state;

    return (
      <div className="registration-form-container">
        <h1 className="form-title">Registration</h1>
        <div className="view-container">
          {isFormSubmitted
            ? isValidOtp
              ? this.renderSubmissionSuccessView()
              : this.renderOtpPage()
            : this.renderRegistrationForm()}
        </div>
      </div>
    );
  }
}

export default RegistrationForm;
