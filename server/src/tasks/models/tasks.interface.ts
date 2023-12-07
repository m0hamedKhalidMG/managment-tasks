/* eslint-disable prettier/prettier */

import { User } from "src/auth/models/user.class";
export interface tasks {
  id?: number;
  desc?: string;
  title?: string;
  finished?: boolean;
  createdAt?: Date;
  owner?: User;
  catagory?: string;
}
