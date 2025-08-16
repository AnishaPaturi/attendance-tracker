import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import { BookOpen, AlertTriangle, CheckCircle } from "lucide-react";

export interface Subject {
  id: string;
  name: string;
  abbreviation: string;
  attended: number;
  total: number;
  percentage: number;
}

interface SubjectsBreakdownProps {
  subjects: Subject[];
}

export function SubjectsBreakdown({ subjects }: SubjectsBreakdownProps) {
  const getSubjectStatus = (percentage: number) => {
    if (percentage >= 75) return { color: "bg-green-100 text-green-800 border-green-200", icon: CheckCircle, status: "Safe" };
    if (percentage >= 65) return { color: "bg-yellow-100 text-yellow-800 border-yellow-200", icon: AlertTriangle, status: "Warning" };
    return { color: "bg-red-100 text-red-800 border-red-200", icon: AlertTriangle, status: "Critical" };
  };

  const getProgressColor = (percentage: number) => {
    if (percentage >= 75) return "bg-green-500";
    if (percentage >= 65) return "bg-yellow-500";
    return "bg-red-500";
  };

  const getClassesNeeded = (subject: Subject) => {
    const requiredAttendance = Math.ceil(subject.total * 0.75);
    const needed = Math.max(0, requiredAttendance - subject.attended);
    return needed;
  };

  return (
    <div className="space-y-4 pb-6">
      <div className="text-center mb-6">
        <h2 className="text-xl font-bold text-gray-800 mb-2">Subject Breakdown</h2>
        <p className="text-sm text-gray-600">Track your attendance for each subject</p>
      </div>

      {subjects.map((subject) => {
        const status = getSubjectStatus(subject.percentage);
        const classesNeeded = getClassesNeeded(subject);
        const IconComponent = status.icon;

        return (
          <Card key={subject.id} className="p-5 border-0 shadow-md hover:shadow-lg transition-shadow">
            <div className="space-y-4">
              {/* Header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <BookOpen className="w-4 h-4 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">{subject.name}</h3>
                    <div className="flex items-center space-x-2 mt-1">
                      <Badge variant="outline" className={`text-xs px-2 py-1 ${status.color}`}>
                        {subject.abbreviation}
                      </Badge>
                      <Badge variant="outline" className={`text-xs px-2 py-1 ${status.color}`}>
                        <IconComponent className="w-3 h-3 mr-1" />
                        {status.status}
                      </Badge>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-gray-800">{subject.percentage}%</div>
                  <div className="text-xs text-gray-500">{subject.attended}/{subject.total}</div>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Attendance Progress</span>
                  <span className="text-gray-500">{subject.attended} of {subject.total} classes</span>
                </div>
                <div className="relative">
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div 
                      className={`h-3 rounded-full transition-all duration-1000 ease-out ${getProgressColor(subject.percentage)}`}
                      style={{ width: `${subject.percentage}%` }}
                    ></div>
                  </div>
                  {/* 75% marker */}
                  <div className="absolute top-0 left-3/4 w-0.5 h-3 bg-gray-400 opacity-50"></div>
                </div>
              </div>

              {/* Classes Needed */}
              {classesNeeded > 0 && (
                <div className="bg-gray-50 rounded-lg p-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">To reach 75%:</span>
                    <span className="font-semibold text-gray-800">
                      Attend {classesNeeded} more class{classesNeeded !== 1 ? 'es' : ''}
                    </span>
                  </div>
                </div>
              )}

              {subject.percentage >= 75 && (
                <div className="bg-green-50 rounded-lg p-3">
                  <div className="flex items-center text-sm text-green-700">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    <span>Great job! You're above the 75% requirement</span>
                  </div>
                </div>
              )}
            </div>
          </Card>
        );
      })}
    </div>
  );
}