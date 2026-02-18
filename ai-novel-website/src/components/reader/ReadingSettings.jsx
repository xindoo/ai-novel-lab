import { useFontSize } from '../../hooks/useFontSize';

export function ReadingSettings() {
  const { fontSize, setFontSize, increaseFontSize, decreaseFontSize } = useFontSize();
  const sizes = [
    { value: 'sm', label: '小' },
    { value: 'md', label: '中' },
    { value: 'lg', label: '大' },
    { value: 'xl', label: '特大' },
  ];

  return (
    <div className="flex items-center gap-2">
      <button onClick={decreaseFontSize} className="p-2 rounded-lg hover:bg-bg-tertiary cursor-pointer transition-theme" aria-label="减小字体">
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
        </svg>
      </button>
      <div className="flex gap-1">
        {sizes.map((size) => (
          <button
            key={size.value}
            onClick={() => setFontSize(size.value)}
            className={`px-2 py-1 rounded text-sm transition-theme cursor-pointer ${fontSize === size.value ? 'bg-accent-primary text-white' : 'text-text-secondary hover:bg-bg-tertiary'}`}
          >
            {size.label}
          </button>
        ))}
      </div>
      <button onClick={increaseFontSize} className="p-2 rounded-lg hover:bg-bg-tertiary cursor-pointer transition-theme" aria-label="增大字体">
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
      </button>
    </div>
  );
}
