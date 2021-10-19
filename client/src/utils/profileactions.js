import axios from 'axios';

// Get current profile
export const getCurrentProfile = () => {
  return axios
    .get('http://localhost:5000/profile', {
      headers: {
        'x-access-token': localStorage.getItem('token'),
      },
    })
    .then(
      (res) => {
        return res.data;
      }
      // dispatch({
      //   payload: res.data,
      // })
    );
};

// Create Profile
export const createProfile = (profileData, history) => {
  console.log(profileData);
  axios
    .post('http://localhost:5000/profile', profileData, {
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': localStorage.getItem('token'),
      },
    })
    .then((res) => history.push('/patient/profile'))
    .catch((err) => console.log(err));
};