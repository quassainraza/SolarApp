export function lib(): string {
  return 'lib';
}

export type DeviceType = 'solar geyser' | 'solar panel';

export interface IUser {
  id?: number;
  email: string;
  firstname: string;
  lastname?: string;
  telephone?: string;
  avatar?: string;
  password: string;
  devices?: IDevice[];
  createdAt?: Date;
  deletedAt?: Date;
  updatedAt?: Date;
  lastLogin?: Date;
}

export interface IDevice {
  id?: number;
  serialNo?: string;
  title: string;
  type: DeviceType;
  comments?: string;
  locationObject: unknown;
  userId?: number;
  user?: IUser;
  deviceSpecs: ISolarGeyser | ISolarPanel;
  createdAt?: Date;
  deletedAt?: Date;
  updatedAt?: Date;
}

export interface ISolarPanel {
  powerOutput: number | '';
  size: number | '';
}

export interface ISolarGeyser {
  capacity: number | '';
  occupants: number | '';
}