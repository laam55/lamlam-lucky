const access_token = GetQueryStringVar('token') || GetLocalStorage('token');
const baseUrl = GetQueryStringVar('baseUrl') || GetLocalStorage('baseUrl');
const eventId = GetQueryStringVar('eventId') || GetLocalStorage('eventId');

console.log('ttt -- access_token', access_token);
console.log('ttt -- baseUrl', baseUrl);
console.log('ttt -- eventId', eventId);

async function ListStaff() {
  return $.ajax({
    async: true,
    crossDomain: true,
    url: `${baseUrl}/api/event/geteventstaffbyeventid?eventId=${eventId}`,
    method: 'GET',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: `Bearer ${access_token}`,
    },
  }).done(function (response) {
    return response;
  });
}

async function SaveLuckyStaff(staffId, isGift = true) {
  return $.ajax({
    async: true,
    crossDomain: true,
    url: `${baseUrl}/api/event/eventstaffsavegift?eventId=${eventId}&staffId=${staffId}&isGift=${isGift}`,
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: `Bearer ${access_token}`,
    },
  }).done(function (response) {
    return response;
  });
}
