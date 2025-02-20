interface PageHeaderProps {
    title: string;
    description?: string;
    group?: string;
    category?: string;
    difficulty?: 'Beginner' | 'Intermediate' | 'Advanced';
  }
  
  export default function PageHeader({ 
    title, 
    description, 
    group,
    category,
    difficulty 
  }: PageHeaderProps) {
    return (
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col gap-2">
            {group && (
              <div className="flex gap-2 items-center">
                <span className="text-sm text-gray-500">
                  {group}
                </span>
                {category && (
                  <>
                    <span className="text-gray-300">•</span>
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                      {category}
                    </span>
                  </>
                )}
                {difficulty && (
                  <>
                    <span className="text-gray-300">•</span>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      difficulty === 'Beginner' ? 'bg-green-100 text-green-800' :
                      difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {difficulty}
                    </span>
                  </>
                )}
              </div>
            )}
            <h1 className="text-3xl font-bold text-gray-900">{title}</h1>
            {description && (
              <p className="text-lg text-gray-600">{description}</p>
            )}
          </div>
        </div>
      </div>
    );
  }