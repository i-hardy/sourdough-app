/// <reference types="react-scripts" />
declare module '*.mp3' {
  const value: string;
  export default value;
}
declare module "file-loader?name=[name].js!*" {
  const value: string;
  export = value;
}

declare module '*.mdx' {
  let MDXComponent: () => JSX.Element
  export default MDXComponent
}