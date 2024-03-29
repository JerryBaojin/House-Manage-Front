import request from '@/utils/request';

export async function query() {
  return request('/api/users');
}

export async function queryCurrent() {
  return request('/api/currentUser');
}

export async function updateUser(params) {
  return request('/api/updateUser',{
    method: 'post',
    data: params
  });
}
