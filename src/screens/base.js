// Base Component

import React from 'react';
import VersionNumber from 'react-native-version-number';

class BaseComponent extends React.Component {

  constructor(props) {
    super(props)
  }

  /*
  ** Is user authenticated or not?
  */
  isAuthenticated = () => {
    const { userData } = this.props;

    if (userData == undefined || userData == null) return false;
    if (Object.keys(userData).length <= 0) return false;
    
    return true;
  }

  /*
  ** Check Object is filled with value
  */
  isObjectAvailable = object => {
    if (typeof(object) == 'object') {
      if (object !== undefined && object !== null && !this.isArrayAvailable(object)) {
        return true;
      }
      return false;
    }
    return false;
  }

  /*
  ** Is value available?
  */
  isValueAvailable = value => {
    if (value !== null && value !== undefined) {
      return true;
    }
    return false;
  }

  isStringAvailable = string => {
    if (string !== null && string !== undefined && string !== "") {
      return true;
    }
    return false;
  }

  isArrayAvailable = array => {
    if (Array.isArray(array)) return true;
    return false;
  }

  isTrue = value => {
    if (value == true && value != null) return true;
    return false;
  }

  isInt = (n) => {
    return Number(n) === n && n % 1 === 0;
  };

  isFloat = (n) => {
    return Number(n) === n && n % 1 !== 0;
  };

  /*
  ** Return App version number
  */
  getVersionNumber = () => {
    return VersionNumber.appVersion;
  }

}

export default BaseComponent;