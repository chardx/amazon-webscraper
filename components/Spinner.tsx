type SpinnerProps = {
  className?: string;
};

const Spinner = ({ className = "h-6 w-6" }: SpinnerProps) => {
  return (
    <span
      className={`grid grid-cols-3 gap-0.5 ${className}`}
      role="status"
      aria-label="Loading"
    >
      {Array.from({ length: 9 }, (_, index) => (
        <span
          key={index}
          className="animate-pulse bg-indigo-600"
          style={{ animationDelay: `${index * 80}ms` }}
        />
      ))}
    </span>
  );
};

export default Spinner;
