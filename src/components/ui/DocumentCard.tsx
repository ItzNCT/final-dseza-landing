import { Link } from 'react-router-dom';

interface DocumentCardProps {
  id: string;
  title: string;
  docNumber: string;
  releaseDate: string;
  path: string;
}

export const DocumentCard = ({ id, title, docNumber, releaseDate, path }: DocumentCardProps) => {
  return (
    <Link to={path} className="block group">
      <div className="h-full bg-yellow-100 p-6 rounded-lg shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border-l-4 border-yellow-400">
        <h3 className="text-lg font-bold text-gray-800 mb-2 line-clamp-3">{title}</h3>
        <div className="text-sm text-gray-600 space-y-1 mt-4">
          <p>
            <span className="font-semibold">Số/Ký hiệu:</span> {docNumber}
          </p>
          <p>
            <span className="font-semibold">Ngày ban hành:</span> {releaseDate}
          </p>
        </div>
      </div>
    </Link>
  );
}; 