/// <reference types="react-scripts" />
  declare module '*.mp3' {
    const value: string;
    export default value;
  }
  declare module '*.md' {
    const value: string;
    export default value;
  }

declare module "file-loader?name=[name].js!*" {
  const value: string;
  export = value;
}