const TOKEN =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhZG1pbmVycCIsImp0aSI6ImI3NzRkMTdhLTRhYTYtNGM5Mi1hY2M5LWZmOWFjMGQwN2FiOCIsImVtYWlsIjoiICIsImZhbWlseV9uYW1lIjoiTm92YW9uMDUzMCIsIm5hbWUiOiJBZG1pbnN0cmF0b3IxIiwiZm0iOiIyIiwic3lzdGVtIjoiTm92YW9uMDUzMCIsInVpZCI6IjEiLCJyb2xlcyI6IjgiLCJleHAiOjE3MDQ0MjIzMzQsImlzcyI6IlNlY3VyZUFwaSIsImF1ZCI6IlNlY3VyZUFwaVVzZXIifQ.y5pUHGO0ej7aMsBQ_tUbVDK1jodp8Kh73wG9mVCs038';
const EVENT_ID = 28;
const BASE_URL = `http://192.168.30.194:8088`;

async function ListStaff() {
  accessToken = localStorage.getItem('token') || TOKEN;

  return $.ajax({
    async: true,
    crossDomain: true,
    url: `${BASE_URL}/api/event/geteventstaffbyeventid?eventId=${EVENT_ID}`,
    method: 'GET',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: `Bearer ${accessToken}`,
    },
  }).done(function (response) {
    return response;
  });
}

async function SaveLuckyStaff(staffId) {
  accessToken = localStorage.getItem('token') || TOKEN;

  return $.ajax({
    async: true,
    crossDomain: true,
    url: `${BASE_URL}/api/event/eventstaffsavegift?eventId=${EVENT_ID}&staffId=${staffId}&isGift=true`,
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: `Bearer ${accessToken}`,
    },
  }).done(function (response) {
    return response;
  });
}
