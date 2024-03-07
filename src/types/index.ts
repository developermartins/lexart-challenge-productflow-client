type toDateString = Date;

export type ProductData = {
  id?: string,
  name?: string,
  brand?: string,
  model?: string,
  price?: string,
  color?: string,
  details?: string,
  data?: {
    price: number,
    color: string
  }[] | any,
  createdAt: toDateString
};

export type styleTypes = {
  color?: string,
  imgUrl?: any,
};

export type UserData = {
  email?: String,
  currentEmail?: String,
  newEmail?: String,
  userName?: String,
  currentPassword?: String,
  newPassword?: String,
  newUsername?: String,
  confirmPassword?: String,
};

export type ResumeData = {
  title?: String,
  resume?: String,
};
