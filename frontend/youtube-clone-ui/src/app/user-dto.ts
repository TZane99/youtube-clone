import { UrlWithStringQuery } from "url";

export interface UserDto{
    id: string;
    sub: string;
    firstName: string;
    lastName: string;
    nickname: string;
    fullName: string;
    picture: string;
    email: string;
    channelName: string;
    address: string;
    phoneNumber: string;
    firstTimeUser: boolean;
}