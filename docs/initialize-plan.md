# 모바일 청첩장 프로젝트 계획

- 도메인: https://wedding.ywtechit.com (Cloudflare에서 구매, 네임서버 Cloudflare)
- 배포: Vercel, GitHub 저장소 `YWTechIT/wedding-invitation` 연동
- 기술 스택: Next.js 16 App Router, TypeScript, Tailwind v4, pnpm
- 작업 규칙: git commit과 git push는 사용자가 명시적으로 지시했을 때만 실행한다.

## 현재 상태 (2026-09-13)

- 프로젝트 뼈대 생성 완료. 연결 테스트 페이지(`src/app/page.tsx`)가 도메인 문구와 빌드 시각, 커밋 해시를 표시한다.
- `pnpm lint`, `pnpm build` 통과 확인.
- 로컬 브랜치 `chore/initialize`에 미추적 상태로 남아 있음. 원격에는 아무것도 올라가지 않았다.
- 커밋 작성자 정보가 회사 계정으로 되어 있어, 이 저장소 전용 작성자 설정이 필요하다.

## 1단계: 테스트 페이지 커밋과 푸시

1. 저장소 전용 git 작성자(user.name, user.email)를 결정해서 로컬 설정에 반영한다.
2. 사용자 지시에 따라 커밋하고, GitHub 계정 `YWTechIT`으로 푸시한다. 키체인에 회사 계정이 저장되어 있어 계정 선택이 필요하다.

## 2단계: Vercel 프로젝트 생성 (대시보드에서 직접 진행)

1. Vercel에서 Add New Project로 GitHub 저장소를 가져온다. Next.js와 pnpm은 자동 감지된다.
2. 첫 배포 후 `*.vercel.app` 주소에서 테스트 문구를 확인한다.
3. 이후 main 푸시는 프로덕션 배포, 다른 브랜치는 프리뷰 배포가 된다.

## 3단계: 도메인 연결

1. Vercel 프로젝트 Settings > Domains에서 `wedding.ywtechit.com`을 추가한다.
2. Cloudflare DNS에 Vercel이 안내하는 CNAME 레코드를 추가한다. 대상은 보통 `cname.vercel-dns.com`이며, 실제 값은 Vercel 화면 기준으로 한다.
3. Proxy status는 DNS only(회색 구름)로 둔다. Vercel이 인증서와 HTTPS를 직접 처리하므로 프록시를 켜면 리디렉션이 반복될 수 있다. 프록시를 쓰려면 SSL/TLS 모드를 Full (strict)로 맞춘다.
4. Vercel Domains 화면에 Valid Configuration이 표시되면 `dig`와 `curl`로 HTTPS 응답을 검증한다.

## 4단계: 청첩장 본문 구현 (실물 청첩장 완성 후)

- 디자인: Tailwind v4로 진행한다. `globals.css`의 `@theme`에 배경색, 강조색, 본문색과 제목용 명조체, 본문용 고딕체 토큰만 정의한다. 별도 컴포넌트 라이브러리는 쓰지 않는다.
- 구조: 섹션마다 컴포넌트 파일 하나. 내용은 `src/config/wedding.ts` 한 곳에 모아 둔다.
- 예상 섹션: 표지, 인사말과 혼주, 예식 일시와 달력, 갤러리, 오시는 길(지도 앱 링크), 계좌번호(복사), 공유, 방명록.

## 5단계: 방명록과 DB

- DB: Neon Postgres 권장 (Vercel Marketplace 연동, 무료 티어, `DATABASE_URL` 자동 주입). 사용자 확인 대기 중.
- 대안: Supabase(관리 화면 편리하나 과함), Upstash Redis(가볍지만 목록 관리 불편).
- 구현: 별도 백엔드 없이 Next.js 안에서 처리. 읽기는 서버 컴포넌트, 쓰기와 삭제는 Server Actions, ORM은 Drizzle.
- 테이블: guestbook(id, name, message, password_hash, created_at). 삭제용 4자리 비밀번호, 스팸 방지용 숨은 필드.
- 로컬 환경 변수는 `vercel env pull`로 받는다.

## 미결 사항

- 방명록 DB stack 결정 필요
- 카카오톡 공유 기능을 넣을 경우 Kakao Developers 앱 키와 도메인 등록 필요.
