var staticRef = "";

const setDropdownAlertRef = (ref) => {
    staticRef = ref
}

const showDropdownAlert = (alertType, alertTitle, alertMessage) => {
    staticRef.alertWithType(alertType, alertTitle, alertMessage)
}

export default {
    setDropdownAlertRef,
    showDropdownAlert
}