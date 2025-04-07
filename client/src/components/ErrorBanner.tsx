// components/ErrorBanner.tsx
export default function ErrorBanner({ message }: { message: string }) {
  return (
    <div className="bg-red-100 text-red-700 px-4 py-2 rounded-lg border border-red-300 text-sm">
      {message}
    </div>
  );
}
