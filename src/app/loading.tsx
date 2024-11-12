import { Skeleton } from '../components/ui/skeleton';

export default function Loading() {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      }}
    >
      <Skeleton className="w-1/2 h-1/2" />
    </div>
  );
}
