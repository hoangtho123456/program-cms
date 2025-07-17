export {}; // Makes this file an external module
declare global {
  type NoneValue = null | undefined;
  type IDType = number | string | null;
  type BooleanType = {
    id: number | boolean,
    name: string
  }
  type LangType = {
    id: string,
    name: string
  }
}
