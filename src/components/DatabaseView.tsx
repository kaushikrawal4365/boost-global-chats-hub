
import React, { useState, useEffect } from 'react';
import { Badge } from '@/components/ui/badge';

interface DatabaseViewProps {
  title: string;
  data: any[] | null;
  type: 'users' | 'feedback' | 'contacts';
}

const DatabaseView: React.FC<DatabaseViewProps> = ({ title, data, type }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredData, setFilteredData] = useState<any[]>([]);
  
  useEffect(() => {
    if (data) {
      setFilteredData(
        data.filter((item) => 
          JSON.stringify(item).toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }
  }, [data, searchTerm]);

  const renderTableHeaders = () => {
    if (!data || data.length === 0) return null;
    
    switch (type) {
      case 'users':
        return (
          <tr>
            <th className="py-2 px-4 bg-gray-100 font-medium text-left">ID</th>
            <th className="py-2 px-4 bg-gray-100 font-medium text-left">Name</th>
            <th className="py-2 px-4 bg-gray-100 font-medium text-left">Email</th>
            <th className="py-2 px-4 bg-gray-100 font-medium text-left">Plan</th>
            <th className="py-2 px-4 bg-gray-100 font-medium text-left">Messages</th>
            <th className="py-2 px-4 bg-gray-100 font-medium text-left">API Key</th>
          </tr>
        );
      case 'feedback':
        return (
          <tr>
            <th className="py-2 px-4 bg-gray-100 font-medium text-left">ID</th>
            <th className="py-2 px-4 bg-gray-100 font-medium text-left">Name</th>
            <th className="py-2 px-4 bg-gray-100 font-medium text-left">Email</th>
            <th className="py-2 px-4 bg-gray-100 font-medium text-left">Message</th>
            <th className="py-2 px-4 bg-gray-100 font-medium text-left">Date</th>
            <th className="py-2 px-4 bg-gray-100 font-medium text-left">Subscribed</th>
          </tr>
        );
      case 'contacts':
        return (
          <tr>
            <th className="py-2 px-4 bg-gray-100 font-medium text-left">ID</th>
            <th className="py-2 px-4 bg-gray-100 font-medium text-left">Name</th>
            <th className="py-2 px-4 bg-gray-100 font-medium text-left">Email</th>
            <th className="py-2 px-4 bg-gray-100 font-medium text-left">Message</th>
            <th className="py-2 px-4 bg-gray-100 font-medium text-left">Date</th>
          </tr>
        );
      default:
        return null;
    }
  };

  const renderTableRows = () => {
    if (!filteredData || filteredData.length === 0) {
      return (
        <tr>
          <td colSpan={6} className="py-4 px-4 text-center text-gray-500">
            No data available
          </td>
        </tr>
      );
    }

    return filteredData.map((item, index) => {
      switch (type) {
        case 'users':
          return (
            <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
              <td className="py-2 px-4">{item.id}</td>
              <td className="py-2 px-4">{item.name}</td>
              <td className="py-2 px-4">{item.email}</td>
              <td className="py-2 px-4">
                <Badge variant={item.plan === 'free' ? 'outline' : 'default'}>
                  {item.plan}
                </Badge>
              </td>
              <td className="py-2 px-4">
                {item.messagesUsed} / {item.messageLimit === Infinity ? '∞' : item.messageLimit}
              </td>
              <td className="py-2 px-4">
                <code className="bg-gray-100 px-2 py-1 rounded text-sm">{item.apiKey}</code>
              </td>
            </tr>
          );
        case 'feedback':
          return (
            <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
              <td className="py-2 px-4">{item.id}</td>
              <td className="py-2 px-4">{item.name}</td>
              <td className="py-2 px-4">{item.email}</td>
              <td className="py-2 px-4 max-w-xs truncate">{item.message}</td>
              <td className="py-2 px-4">{new Date(item.timestamp).toLocaleString()}</td>
              <td className="py-2 px-4">
                {item.subscribe ? (
                  <Badge variant="default" className="bg-green-500">Yes</Badge>
                ) : (
                  <Badge variant="outline">No</Badge>
                )}
              </td>
            </tr>
          );
        case 'contacts':
          return (
            <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
              <td className="py-2 px-4">{item.id}</td>
              <td className="py-2 px-4">{item.name}</td>
              <td className="py-2 px-4">{item.email}</td>
              <td className="py-2 px-4 max-w-xs truncate">{item.message}</td>
              <td className="py-2 px-4">{new Date(item.timestamp).toLocaleString()}</td>
            </tr>
          );
        default:
          return null;
      }
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-8">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold">{title}</h3>
        <div className="relative">
          <input
            type="text"
            placeholder="Search..."
            className="border rounded-md py-2 px-4 pr-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <span className="absolute right-3 top-2.5 text-gray-400">🔍</span>
        </div>
      </div>

      <div className="overflow-auto">
        <table className="w-full border-collapse">
          <thead>
            {renderTableHeaders()}
          </thead>
          <tbody>
            {renderTableRows()}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DatabaseView;
