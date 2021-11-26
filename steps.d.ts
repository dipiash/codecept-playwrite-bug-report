/// <reference types='codeceptjs' />
type steps_file = typeof import('./steps_file');

declare namespace CodeceptJS {
  interface SupportObject { I: I, login, current: any }
  interface CallbackOrder { [0]: CodeceptJS.I }
  interface Methods extends Playwright {}
  interface I extends ReturnType<steps_file> {
    executeScript: (params: string | ((...params: any[]) => any)) => any
  }
  namespace Translation {
    interface Actions {}
  }
}
