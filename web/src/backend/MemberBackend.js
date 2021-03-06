// Copyright 2020 The casbin Authors. All Rights Reserved.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import * as Setting from "../Setting";

export function getMembers() {
  return fetch(`${Setting.ServerUrl}/api/get-members`, {
    method: "GET",
    credentials: "include",
  }).then((res) => res.json());
}

export function getMembersAdmin(cs, us, un, limit, page) {
  return fetch(
    `${Setting.ServerUrl}/api/get-members-admin?cs=${cs}&us=${us}&un=${un}&limit=${limit}&page=${page}`,
    {
      method: "GET",
      credentials: "include",
    }
  ).then((res) => res.json());
}

export function getMember(id) {
  return fetch(`${Setting.ServerUrl}/api/get-member?id=${id}`, {
    method: "GET",
    credentials: "include",
  }).then((res) => res.json());
}

export function getMemberAdmin(id) {
  return fetch(`${Setting.ServerUrl}/api/get-member-admin?id=${id}`, {
    method: "GET",
    credentials: "include",
  }).then((res) => res.json());
}

export function getMemberAvatar(id) {
  return fetch(`${Setting.ServerUrl}/api/get-member-avatar?id=${id}`, {
    method: "GET",
    credentials: "include",
  }).then((res) => res.json());
}

export function updateMemberAvatar(avatar) {
  return fetch(
    `${Setting.ServerUrl}/api/update-member-avatar?avatar=${avatar}`,
    {
      method: "POST",
      credentials: "include",
    }
  ).then((res) => res.json());
}

export function updateMemberEmailReminder(status) {
  return fetch(
    `${Setting.ServerUrl}/api/update-member-email-reminder?status=${status}`,
    {
      method: "POST",
      credentials: "include",
    }
  ).then((res) => res.json());
}

export function updateMember(id, member) {
  return fetch(`${Setting.ServerUrl}/api/update-member?id=${id}`, {
    method: "POST",
    credentials: "include",
    body: JSON.stringify(member),
  }).then((res) => res.json());
}

export function updateMemberInfo(id, member) {
  return fetch(`${Setting.ServerUrl}/api/update-member-info?id=${id}`, {
    method: "POST",
    credentials: "include",
    body: JSON.stringify(member),
  }).then((res) => res.json());
}

export function addMember(member) {
  return fetch(`${Setting.ServerUrl}/api/add-member`, {
    method: "POST",
    credentials: "include",
    body: JSON.stringify(member),
  }).then((res) => res.json());
}

export function deleteMember(id) {
  return fetch(`${Setting.ServerUrl}/api/delete-member?id=${id}`, {
    method: "POST",
    credentials: "include",
  }).then((res) => res.json());
}

export function googleLogin(code, state, redirectUrl, addition) {
  return fetch(
    `${Setting.ServerUrl}/api/auth/google?code=${code}&state=${state}&redirect_url=${redirectUrl}&addition=${addition}`,
    {
      method: "GET",
      credentials: "include",
    }
  ).then((res) => res.json());
}

export function githubLogin(code, state, redirectUrl, addition) {
  console.log(redirectUrl);
  return fetch(
    `${Setting.ServerUrl}/api/auth/github?code=${code}&state=${state}&redirect_url=${redirectUrl}&addition=${addition}`,
    {
      method: "GET",
      credentials: "include",
    }
  ).then((res) => res.json());
}

export function qqLogin(code, state, redirectUrl, addition) {
  console.log(redirectUrl);
  return fetch(
    `${Setting.ServerUrl}/api/auth/qq?code=${code}&state=${state}&redirect_url=${redirectUrl}&addition=${addition}`,
    {
      method: "GET",
      credentials: "include",
    }
  ).then((res) => res.json());
}

export function wechatLogin(code, state, redirectUrl, addition) {
  console.log(redirectUrl);
  return fetch(
    `${Setting.ServerUrl}/api/auth/wechat?code=${code}&state=${state}&redirect_url=${redirectUrl}&addition=${addition}`,
    {
      method: "GET",
      credentials: "include",
    }
  ).then((res) => res.json());
}

export function updateMemberLanguage(language) {
  return fetch(
    `${Setting.ServerUrl}/api/update-member-language?language=${language}`,
    {
      method: "POST",
      credentials: "include",
    }
  ).then((res) => res.json());
}
