export function setErrorInLabel(element): void {
  element.style.backgroundColor = '#ff7171';
  element.innerText = 'Error';
}
export function setSuccessInLabel(element: HTMLElement): { andThenResetTo(initialState: string): void } {
  return {
    andThenResetTo(initialState: string): void {
      element.innerText = 'Succeed!';
      setTimeout(() => {
        element.innerHTML = initialState;
      }, 1000);

    }
  };
}
export function writeTheFollowing(progressPercent): any {
  return {
    to(element): void {
      element.innerText = progressPercent;
    }
  };
}
