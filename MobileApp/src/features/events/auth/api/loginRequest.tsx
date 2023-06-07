import axios from 'axios';
import {BACKEND_EVENT_PRIVATE_API_URL} from '../../api/constants';

export const firstLogin = async (
  token: string,
  userId: string,
  user: string,
) => {
  // console.log(token, userId, user);
  // console.log(BACKEND_EVENT_PRIVATE_API_URL + 'user/firstlogin');
  // console.log('TSO?');

  return axios
    .post(
      BACKEND_EVENT_PRIVATE_API_URL + 'user/firstlogin',
      {
        username: user,
        id: userId,
      },
      {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      },
    )
    .then(response => {
      //console.log('Success');
      return response.data;
    });
};
