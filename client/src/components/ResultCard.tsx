// components/ResultCard.tsx
export default function ResultCard({
  title,
  points,
}: {
  title: string;
  points: string[];
}) {
  return (
    <div className="p-6 rounded-xl bg-white shadow-lg border border-indigo-100 mb-4">
      <h2 className="text-xl font-semibold text-indigo-700 mb-3">{title}</h2>
      <ul className="list-disc list-inside space-y-1 text-gray-700">
        {points.map((point, idx) => (
          <li key={idx}>{point}</li>
        ))}
      </ul>
    </div>
  );
}
