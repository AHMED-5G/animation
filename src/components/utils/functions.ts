export function containsUppercase(str: string) {
  return /[A-Z]/.test(str);
}

export function containsSpecialChars(str: string) {
  const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
  return specialChars.test(str);
}

export function containsNumber(str: string) {
  return /\d/.test(str);
}

export function hasLowerCase(str:string) {
  return str.toUpperCase() != str;
}