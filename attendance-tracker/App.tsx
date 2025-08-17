import { useState } from "react";
import { Dashboard } from "./components/Dashboard";
import { SubjectsBreakdown, Subject } from "./components/SubjectBreakdown";
import { Reminders } from "./components/Reminders";
import { BottomNavigation } from "./components/BottomNavigation";
import { Login } from "./components/Login";
import { User } from "lucide-react"; 
import HomeScreen from './app/(tabs)/index'; // Import HomeScreen

interface Student {
  id: string;
  name: string;
  rollNumber: string;
  email: string;
  semester: string;
}

export default function App() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [currentStudent, setCurrentStudent] = useState<Student | null>(null);

  // Mock data for subjects
  const subjects: Subject[] = [
    {
      id: "daa",
      name: "Design and Analysis of Algorithms",
      abbreviation: "DAA",
      attended: 24,
      total: 30,
      percentage: 80
    },
    {
      id: "se",
      name: "Software Engineering",
      abbreviation: "SE",
      attended: 18,
      total: 25,
      percentage: 72
    },
    {
      id: "wt",
      name: "Web Technologies",
      abbreviation: "WT",
      attended: 22,
      total: 28,
      percentage: 79
    },
    {
      id: "cn",
      name: "Computer Networks",
      abbreviation: "CN",
      attended: 15,
      total: 26,
      percentage: 58
    },
    {
      id: "se-lab",
      name: "Software Engineering Lab",
      abbreviation: "SE Lab",
      attended: 10,
      total: 15,
      percentage: 67
    },
    {
      id: "ai",
      name: "Artificial Intelligence",
      abbreviation: "AI",
      attended: 20,
      total: 24,
      percentage: 83
    },
    {
      id: "aecs-lab",
      name: "Advanced English Communication Skills Lab",
      abbreviation: "AECS Lab",
      attended: 8,
      total: 12,
      percentage: 67
    }
  ];

  // Calculate overall stats
  const totalAttended = subjects.reduce((sum, subject) => sum + subject.attended, 0);
  const totalClasses = subjects.reduce((sum, subject) => sum + subject.total, 0);
  const overallAttendance = Math.round((totalAttended / totalClasses) * 100);

  const handleLogin = (student: Student) => {
    setCurrentStudent(student);
  };

  const handleLogout = () => {
    setCurrentStudent(null);
    setActiveTab("dashboard");
  };

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return (
          <Dashboard
            overallAttendance={overallAttendance}
            attendedClasses={totalAttended}
            totalClasses={totalClasses}
          />
        );
      case "subjects":
        return <SubjectsBreakdown subjects={subjects} />;
      case "reminders":
        return <Reminders subjects={subjects} />;
      case "home":
        return <HomeScreen />;
        return null;
    }
  };

  // Show login page if no student is logged in
  if (!currentStudent) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4 sticky top-0 z-10 shadow-sm relative">
        <div className="max-w-md mx-auto">
          <div className="pr-20">
            <h1 className="text-xl font-bold text-gray-800">Attendance Tracker</h1>
            <p className="text-sm text-gray-600">Stay on track, stay ahead!</p>
          </div>
          <div className="absolute top-4 right-6 flex items-center space-x-2">
            <button
              onClick={handleLogout}
              className="bg-gray-100 hover:bg-gray-200 text-gray-600 px-2 py-1 rounded-md text-xs transition-colors"
            >
              Logout
            </button>
            <div className="bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
              Under 25
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-md mx-auto px-6 pt-6 pb-24">
        {renderContent()}
      </div>

      {/* Footer with Username */}
      <div className="fixed bottom-16 left-0 right-0 px-6">
        <div className="max-w-md mx-auto">
          <div className="bg-gray-50 rounded-lg px-4 py-2 flex items-center justify-center space-x-2">
            <User className="w-4 h-4 text-gray-500" />
            <span className="text-sm text-gray-600">@{currentStudent.name.toLowerCase().replace(' ', '_')}</span>
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <BottomNavigation activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
}