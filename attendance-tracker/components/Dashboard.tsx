import { Card } from "./ui/card";
import { Progress } from "./ui/progress";
import { GraduationCap, Calendar, Target } from "lucide-react";

interface DashboardProps {
  overallAttendance: number;
  attendedClasses: number;
  totalClasses: number;
}

export function Dashboard({ overallAttendance, attendedClasses, totalClasses }: DashboardProps) {
  const classesNeeded = Math.max(0, Math.ceil((0.75 * totalClasses) - attendedClasses));
  
  const getMotivationalMessage = () => {
    if (overallAttendance >= 75) {
      return `Amazing! You're at ${overallAttendance}%! Keep up the great work! 🎉`;
    } else if (overallAttendance >= 65) {
      return `You're at ${overallAttendance}%! Attend ${classesNeeded} more classes to stay above 75%! 💪`;
    } else {
      return `Alert! You're at ${overallAttendance}%. Attend ${classesNeeded} more classes urgently! 🚨`;
    }
  };

  const getBannerColor = () => {
    if (overallAttendance >= 75) return "bg-gradient-to-r from-green-400 to-green-500";
    if (overallAttendance >= 65) return "bg-gradient-to-r from-orange-400 to-orange-500";
    return "bg-gradient-to-r from-red-400 to-red-500";
  };

  // Calculate stroke offset for circular progress
  const radius = 80;
  const circumference = 2 * Math.PI * radius;
  const strokeOffset = circumference - (overallAttendance / 100) * circumference;

  return (
    <div className="space-y-6 pb-6">
      {/* Circular Progress */}
      <Card className="p-8 text-center bg-gradient-to-br from-blue-50 to-indigo-50 border-0 shadow-lg">
        <div className="flex justify-center">
          <div className="relative w-44 h-44">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 200 200">
              {/* Background Circle */}
              <circle
                cx="100"
                cy="100"
                r={radius}
                stroke="#e5e7eb"
                strokeWidth="12"
                fill="none"
              />
              {/* Progress Circle */}
              <circle
                cx="100"
                cy="100"
                r={radius}
                stroke={overallAttendance >= 75 ? "#10b981" : overallAttendance >= 65 ? "#f59e0b" : "#f87171"}
                strokeWidth="12"
                fill="none"
                strokeLinecap="round"
                strokeDasharray={circumference}
                strokeDashoffset={strokeOffset}
                className="transition-all duration-1000 ease-out"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="text-4xl font-bold text-gray-800">{overallAttendance}%</div>
                <div className="text-sm text-gray-600 mt-1">Overall</div>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 gap-4">
        <Card className="p-4 bg-blue-50 border-0 shadow-md">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-500 rounded-lg">
              <Calendar className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="text-sm text-gray-600">Classes Attended</div>
              <div className="text-2xl font-bold text-blue-600">{attendedClasses}</div>
            </div>
          </div>
        </Card>

        <Card className="p-4 bg-green-50 border-0 shadow-md">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-green-500 rounded-lg">
              <GraduationCap className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="text-sm text-gray-600">Total Classes</div>
              <div className="text-2xl font-bold text-green-600">{totalClasses}</div>
            </div>
          </div>
        </Card>
      </div>

      {/* Motivational Banner */}
      <Card className={`p-6 text-white border-0 shadow-lg ${getBannerColor()}`}>
        <div className="flex items-center space-x-3">
          <Target className="w-6 h-6" />
          <div className="text-sm leading-relaxed">
            {getMotivationalMessage()}
          </div>
        </div>
      </Card>
    </div>
  );
}