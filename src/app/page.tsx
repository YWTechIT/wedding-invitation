const builtAt = new Date();
const commitSha = process.env.VERCEL_GIT_COMMIT_SHA?.slice(0, 7) ?? "local";

export default function Home() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-6 px-6 py-16 text-center">
      <p className="text-sm tracking-widest text-neutral-500 uppercase">
        Connection Test
      </p>
      <h1 className="text-3xl font-semibold">wedding.ywtechit.com</h1>
      <p className="text-neutral-600">
        Vercel 배포와 도메인 연결이 정상적으로 완료되었습니다.
      </p>
      <dl className="mt-4 grid grid-cols-[auto_1fr] gap-x-4 gap-y-1 text-left text-sm text-neutral-500">
        <dt>Build</dt>
        <dd>{builtAt.toISOString()}</dd>
        <dt>Commit</dt>
        <dd>{commitSha}</dd>
      </dl>
    </main>
  );
}
