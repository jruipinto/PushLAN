export function setErrorInLabel(element): void {
  element.style.backgroundColor = '#ff7171';
  element.innerText = 'Error';
}
export function setSuccessInLabel(element): void {
  element.innerText = 'Succeed!';
  setTimeout(() => {
    element.innerText = 'Upload';
  }, 1000);
}
export function writeTheFollowing(progressPercent): any {
  return {
    to(element): void {
      element.innerText = progressPercent;
    }
  };
}
