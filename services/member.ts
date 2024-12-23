import callAPI from '../config/api';

const ROOT_API = process.env.NEXT_PUBLIC_API;
const API_VERSION = 'api/v1';

export async function getMemberOverview() {
  const url = `${ROOT_API}/${API_VERSION}/player/dashboard`;

  return callAPI({
    url,
    method: 'GET',
    token: true,
  });
}

export async function getMemberTransactions(valueParams: string) {
  let params = '';
  if (valueParams === 'all') {
    params = '';
  } else {
    params = `?status=${valueParams}`;
  }
  const url = `${ROOT_API}/${API_VERSION}/player/history${params}`;

  return callAPI({
    url,
    method: 'GET',
    token: true,
  });
}

export async function getTransactionDetail(id: string, token: string) {
  const url = `${ROOT_API}/${API_VERSION}/player/history/${id}/detail`;

  return callAPI({
    url,
    method: 'GET',
    serverToken: token,
  });
}

export async function updateProfile(data: FormData, id: string) {
  const url = `${ROOT_API}/${API_VERSION}/player/profile/${id}`;

  return callAPI({
    url,
    method: 'PUT',
    data,
    token: true,
  });
}
