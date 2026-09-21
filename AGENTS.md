# wedding-invitation

모바일 청첩장 웹사이트. 하객이 카카오톡으로 받은 링크를 열어 보는 한 페이지짜리 모바일 웹이다.

- 도메인: https://wedding.ywtechit.com (Cloudflare DNS)
- 배포: Vercel, GitHub `YWTechIT/wedding-invitation` 연동. main 푸시는 프로덕션, 그 외 브랜치는 프리뷰.
- 설계(무엇을 만드는가): `docs/design-plan.md`
- 구현 단계, 진행 현황, 미결 사항(어떤 순서로 만드는가): `docs/implement-plan.md`
- 설계와 구현 단계는 한 문서에 섞지 않는다. 결정이 바뀌면 해당 문서의 해당 절을 고쳐 쓰고, 문서 끝에 덧붙이지 않는다. 채택하지 않은 안의 기록은 문서로 남기지 않는다.

## 기술 스택

- Next.js 16 App Router, React 19, TypeScript (strict)
- Tailwind CSS v4 (`src/app/globals.css`의 `@theme`으로 토큰 정의)
- pnpm
- 방명록 DB: Supabase(Postgres) + `supabase-js`(서버 전용) + Server Actions. ORM은 쓰지 않는다. 브라우저에 Supabase 클라이언트나 키를 두지 않는다.

## 명령어

```bash
pnpm dev     # 개발 서버
pnpm lint    # ESLint
pnpm build   # 프로덕션 빌드. 작업을 마치면 반드시 통과시킨다.
```

## 작업 규칙

- git commit, git push는 사용자가 명시적으로 지시했을 때만 실행한다. 계획에 적혀 있어도 승인이 아니다.
- 이 저장소는 개인 프로젝트다. GitHub 계정은 `YWTechIT`을 사용하고, 회사 계정으로 푸시하지 않는다.
- 새 의존성은 꼭 필요할 때만 추가한다. 애니메이션, 모달, 캐러셀은 먼저 CSS와 네이티브 요소(`<dialog>`, `IntersectionObserver`)로 해결한다.
- 사용자와의 대화는 한국어로 한다. 코드, 주석, 커밋 메시지는 영어로 쓴다.

## 디렉터리 구조 (목표)

```
src/
  app/
    layout.tsx         # 폰트, 메타데이터(OG), 뷰포트
    page.tsx           # 섹션을 순서대로 조립
    globals.css        # Tailwind 토큰
  components/
    sections/          # cover.tsx, greeting.tsx, calendar.tsx, location.tsx, gallery.tsx, info.tsx, accounts.tsx, guestbook.tsx, share.tsx
    ui/                # section-header.tsx, copy-button.tsx 등 반복 조각만. 타입은 types.ts
  config/
    wedding.ts         # 이름, 혼주, 일시, 장소, 계좌, 사진 목록 등 모든 내용의 단일 출처(상수 `WEDDING`)
    types.ts           # WEDDING의 타입
  lib/                 # 날짜 계산, 클립보드 복사 같은 순수 유틸
  db/                  # 방명록 스키마(SQL)와 쿼리
public/images/         # 사진 원본. next/image로만 렌더링한다.
```

## 코드 규칙

- 서버 컴포넌트가 기본이다. `"use client"`는 클릭, 복사, 카운트다운, 폼처럼 브라우저 상호작용이 있는 최소 단위에만 붙인다.
- 청첩장 내용은 컴포넌트에 하드코딩하지 않고 `src/config/wedding.ts`에서 가져온다. 내용 수정이 코드 수정 없이 끝나야 한다.
- 이미지는 `next/image`, 폰트는 `next/font`를 사용한다. `<img>` 직접 사용 금지.
- 스타일은 Tailwind 클래스로 작성한다. 색상과 폰트는 `@theme` 토큰(`bg-background`, `text-primary`, `font-serif` 등)만 쓰고 임의 색상 값을 클래스에 직접 넣지 않는다.
- 파일과 폴더 이름은 kebab-case로 짓는다(`section-header.tsx`). 컴포넌트와 타입 이름은 PascalCase, 함수는 동사형 camelCase다.
- 타입은 컴포넌트나 설정 파일 안에 선언하지 않고 같은 폴더의 `types.ts`에 모은다. 컴포넌트 props 타입도 포함한다.
- 파일 단위 상수는 `BIG_SNAKE_CASE`로 쓴다(`WEDDING`, `VARIANT_CLASS_NAMES`). 함수 안의 지역 변수는 camelCase다.
- 상태 관리 라이브러리는 쓰지 않는다. 필요한 상태는 컴포넌트 로컬 `useState`로 충분하다.
- 방명록 쓰기와 삭제는 Server Actions로 처리하고 API 라우트를 따로 만들지 않는다. 입력값은 서버에서 검증한다. 예외는 Supabase 일시 중지를 막기 위해 외부 크론(cron-job.org)이 호출하는 핸들러(`app/api/keep-alive`) 하나다. 크론 설정 자체는 저장소에 두지 않는다.

## 모바일 청첩장 특성

- 대상 기기는 스마트폰이다. 본문은 최대 너비를 고정한 중앙 컨테이너(약 448px) 안에 두고, 데스크톱은 같은 레이아웃이 가운데 보이면 된다.
- 대부분 카카오톡 인앱 브라우저에서 열린다. `window.open`, 파일 다운로드, 최신 브라우저 전용 API에 의존하지 않는다.
- 클립보드 복사(계좌번호, 주소)는 `navigator.clipboard`를 쓰되 실패 시 안내 문구를 보여준다.
- 지도는 카카오맵 JavaScript SDK로 표시하고, 그 아래에 카카오맵, 네이버지도, 티맵 앱 링크를 함께 제공한다. SDK는 지도 영역이 화면에 가까워졌을 때 불러오고, 지도는 기본적으로 잠긴 상태로 보여준다. 앱 키는 `NEXT_PUBLIC_KAKAO_MAP_APP_KEY`, 좌표와 링크 URL은 `wedding.ts`에 저장한다. 자세한 설계는 `docs/design-plan.md`, 기술 메모는 `docs/implement-plan.md`에 있다.
- 페이지의 맨 끝에 공유 섹션(카카오톡 공유하기, 링크주소 복사하기)을 둔다. 카카오톡 공유는 지도와 같은 Kakao Developers 앱의 JavaScript 키를 쓴다. 하객은 주로 실물 청첩장의 QR 코드로 들어온다.
- 카카오톡 공유 미리보기를 위해 Open Graph 제목, 설명, 이미지를 반드시 설정한다. `metadataBase`는 환경 변수 `NEXT_PUBLIC_SITE_URL`로 지정한다.
- 사진은 용량이 크므로 첫 화면 사진만 `priority`를 주고 나머지는 지연 로딩한다.
- 계좌번호, 주소, 전화번호 같은 개인정보가 소스에 들어간다. 저장소 공개 범위를 바꾸기 전에 사용자에게 확인한다.

## 진행 순서

1. 연결 테스트 페이지 배포와 도메인 연결
2. 실물 청첩장 완성 후 본문 섹션 구현
3. 방명록과 DB
4. 검색 엔진 차단(noindex 메타, robots.txt, X-Robots-Tag)은 모든 구현이 끝난 뒤 마지막에 처리한다.
