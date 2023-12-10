export interface IContactDataInfor {
  label: string;
  value: string;
}

export interface IContactData {
  subject: string;
  name: string;
  infors: IContactDataInfor[];
}
