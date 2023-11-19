export interface IActivityBarFile {
  title: string;
  icon: string;
  route: string;
  external: boolean;
}

export interface IActivityBarFolder {
  title: string;
  route: string;
  color: string;
  files: IActivityBarFile[];
}

export interface IActivityBar {
  title: string;
  folders: IActivityBarFolder[];
  files: IActivityBarFile[];
}
