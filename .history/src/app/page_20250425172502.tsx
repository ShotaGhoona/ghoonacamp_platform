import { getUser } from '@/lib/auth';
import { UserButton } from '@clerk/nextjs';

export default async function Home() {
  const user = await getUser();

  return (
    <div className="w-full h-full flex flex-col justify-center items-center mt-4 gap-2">
      <h1 className="text-2xl font-bold">Welcome to GhoonaCamp</h1>
      {user && (
        <div className="flex flex-col items-center gap-4">
          <p>
            ようこそ、{user.name || 'ゲスト'}さん！
          </p>
          <div>
            <UserButton afterSignOutUrl="/" />
          </div>
        </div>
      )}
    </div>
  );
}
