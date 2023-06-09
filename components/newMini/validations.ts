export const validateSpecialCharacters = (text: string) => {
  var format = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;

  if (format.test(text)) {
    return "special characters not allowed";
  }
};

export function validateIntNumber(text: string) {
  if (!/^[0-9]+$/.test(text)) {
    return "Enter numeric characters only (Allowed input:0-9)";
  }
}

export function validateHasWhiteSpace(text: string) {
  if (/\s/g.test(text)) {
    return "White space not allowed";
  }
}

export function validateLongTextLength(text: string, length: number) {
  if (text.length > length) {
    return "Too long";
  }
}

export function validateShortTextLength(text: string, length: number) {
  if (text.length < length) {
    return "Too short";
  }
}

export const validateEmail = (email: string) => {
  if (email) {
    if (
      !String(email)
        .toLowerCase()
        .match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        )
    ) {
      return "Invalid Email";
    }
  }
};

export const validateTextMatch = (
  text1: string,
  text2: string,
  name?: string
) => {
  if (text1 !== text2) {
    return name + " " + "not match";
  }
};
