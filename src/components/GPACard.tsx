function GPACard() {
  // Temporary GPA value (will come from logic later)
  const currentGPA = 3.42;

  return (
    <div className="border rounded-lg p-6 shadow-sm max-w-sm">
      <p className="text-sm text-gray-500">Current GPA</p>

      <p className="text-4xl font-bold mt-2">{currentGPA}</p>

      <p className="text-sm text-green-600 mt-2">
        You are performing well this semester
      </p>
    </div>
  );
}

export default GPACard;
