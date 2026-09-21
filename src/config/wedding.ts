// Single source of truth for everything the invitation says.
// A `null` value means the detail has not been provided yet; sections hide the
// matching row, button, or block instead of rendering a placeholder.

import type { Wedding } from "./types";

export const WEDDING: Wedding = {
  meta: {
    title: "안영우 · 정보영 결혼합니다",
    description:
      "2026년 12월 5일 토요일 오후 2시 20분, 경기교총웨딩하우스 단독홀",
  },
  cover: {
    eyebrow: "WEDDING INVITATION",
    headingLines: ["일곱 번째 겨울,", "결혼합니다"],
    photo: {
      src: "/images/cover.jpg",
      alt: "잔디밭에 나란히 앉아 선글라스를 올려 쓰는 신랑과 신부",
      width: 1200,
      height: 1600,
    },
  },
  datetime: "2026-12-05T14:20:00+09:00",
  venue: {
    name: "경기교총웨딩하우스",
    hall: "단독홀",
    address: "경기도 수원시 팔달구 팔달산로 89-13",
    coords: null,
    mapLinks: { naver: null, kakao: null, tmap: null },
  },
  sections: [
    {
      id: "greeting",
      eyebrow: "INVITATION",
      title: "소중한 분들을 초대합니다",
    },
    { id: "calendar", eyebrow: "WEDDING DAY", title: "예식 일시" },
    { id: "location", eyebrow: "LOCATION", title: "오시는 길" },
    { id: "gallery", eyebrow: "GALLERY", title: "갤러리" },
    { id: "info", eyebrow: "INFORMATION", title: "안내사항" },
    { id: "accounts", eyebrow: "ACCOUNT", title: "마음 전하실 곳" },
    { id: "guestbook", eyebrow: "GUESTBOOK", title: "축하 메시지" },
    { id: "share", eyebrow: "SHARE", title: "청첩장 공유하기" },
  ],
  greeting: {
    paragraphs: [
      ["제주에서 작은 인연으로 만나", "연인이 된 두 사람이"],
      ["여섯 번의 사계절을 지나", "일곱 번째 겨울에 부부의 연을 맺고자 합니다"],
      ["함께 축하해 주시면 감사하겠습니다"],
    ],
  },
  groom: {
    label: "신랑측",
    relation: "장남",
    givenName: "영우",
    people: [
      { role: "신랑", name: "안영우", phone: null },
      { role: "아버지", name: "안기원", phone: null },
      { role: "어머니", name: "김윤정", phone: null },
    ],
    accountsLabel: "신랑측 계좌번호",
    accounts: [
      { role: "신랑", name: "안영우", bank: null, number: null },
      { role: "아버지", name: "안기원", bank: null, number: null },
      { role: "어머니", name: "김윤정", bank: null, number: null },
    ],
  },
  bride: {
    label: "신부측",
    relation: "장녀",
    givenName: "보영",
    people: [
      { role: "신부", name: "정보영", phone: null },
      { role: "아버지", name: "정한진", phone: null },
      { role: "어머니", name: "우순덕", phone: null },
    ],
    accountsLabel: "신부측 계좌번호",
    accounts: [
      { role: "신부", name: "정보영", bank: null, number: null },
      { role: "아버지", name: "정한진", bank: null, number: null },
      { role: "어머니", name: "우순덕", bank: null, number: null },
    ],
  },
  transport: [
    {
      label: "주차",
      lines: ["경기교총웨딩하우스 주차장 또는", "경기도청 옛청사 후문 (700대)"],
    },
    { label: "지하철", lines: ["1호선 수원역 13번 출구 50m 직진"] },
    { label: "셔틀버스", lines: ["수원역 승강장에서 수시 운행"] },
    { label: "마을버스", lines: ["27-3 (병무청사거리)"] },
    { label: "간선버스", lines: ["3, 5, 66, 777 (병무청입구)"] },
  ],
  gallery: [],
  info: [
    {
      icon: "photobooth",
      title: "포토부스 이용안내",
      lines: [
        "예식 당일, 포토부스가 준비됩니다.",
        "환한 미소를 사진으로 남기시고",
        "포토부스 화면에 방명록을 적어 주시면",
        "소중히 간직하겠습니다.",
      ],
    },
  ],
  accountsIntro: [
    "참석이 어려우신 분들을 위해",
    "계좌번호를 기재하였습니다",
    "너그러운 마음으로 양해 부탁드립니다",
  ],
};
