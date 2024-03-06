type toDateString = Date;

export type PostData = {
  _id?: string, 
  title?: String,
  category?: String,
  description?: String,
  liveApplicationLink?: string,
  stackList?: Array<string>,
  content?: String | TrustedHTML,
  imgUrl?: any,
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
