import { useState } from "react";
import { Card } from "./ui/card";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Search, User, GraduationCap } from "lucide-react";

interface Student {
  id: string;
  name: string;
  rollNumber: string;
  email: string;
  semester: string;
}

interface LoginProps {
  onLogin: (student: Student) => void;
}

export function Login({ onLogin }: LoginProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);

  // Mock student data
  const students: Student[] = [
    { id: "1", name: "Rahul Sharma", rollNumber: "21CS001", email: "rahul.sharma@college.edu", semester: "6th" },
    { id: "2", name: "Priya Patel", rollNumber: "21CS002", email: "priya.patel@college.edu", semester: "6th" },
    { id: "3", name: "Amit Kumar", rollNumber: "21CS003", email: "amit.kumar@college.edu", semester: "6th" },
    { id: "4", name: "Sneha Reddy", rollNumber: "21CS004", email: "sneha.reddy@college.edu", semester: "6th" },
    { id: "5", name: "Vikram Singh", rollNumber: "21CS005", email: "vikram.singh@college.edu", semester: "6th" },
    { id: "6", name: "Anisha Gupta", rollNumber: "21CS006", email: "anisha.gupta@college.edu", semester: "6th" },
    { id: "7", name: "Rohan Mehta", rollNumber: "21CS007", email: "rohan.mehta@college.edu", semester: "6th" },
    { id: "8", name: "Kavya Joshi", rollNumber: "21CS008", email: "kavya.joshi@college.edu", semester: "6th" },
    { id: "9", name: "Arjun Nair", rollNumber: "21CS009", email: "arjun.nair@college.edu", semester: "6th" },
    { id: "10", name: "Ishita Agarwal", rollNumber: "21CS010", email: "ishita.agarwal@college.edu", semester: "6th" }
  ];

  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    student.rollNumber.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleStudentSelect = (student: Student) => {
    setSelectedStudent(student);
  };

  const handleLogin = () => {
    if (selectedStudent) {
      onLogin(selectedStudent);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-6">
      <div className="w-full max-w-md space-y-6">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-full shadow-lg">
            <GraduationCap className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-800 mb-2">Attendance Tracker</h1>
            <p className="text-gray-600">Find your name to get started</p>
          </div>
        </div>

        {/* Search Card */}
        <Card className="p-6 border-0 shadow-xl bg-white/80 backdrop-blur-sm">
          <div className="space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                type="text"
                placeholder="Search by name or roll number..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-12 border-2 border-gray-200 focus:border-blue-500 transition-colors"
              />
            </div>

            {/* Search Results */}
            {searchQuery && (
              <div className="max-h-64 overflow-y-auto space-y-2">
                {filteredStudents.length > 0 ? (
                  filteredStudents.map((student) => (
                    <button
                      key={student.id}
                      onClick={() => handleStudentSelect(student)}
                      className={`w-full p-3 rounded-lg text-left transition-all border-2 ${
                        selectedStudent?.id === student.id
                          ? 'bg-blue-50 border-blue-500 text-blue-700'
                          : 'bg-gray-50 border-gray-200 hover:bg-gray-100 text-gray-700'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                          <User className="w-4 h-4 text-blue-600" />
                        </div>
                        <div className="flex-1">
                          <div className="font-medium">{student.name}</div>
                          <div className="text-sm opacity-75">{student.rollNumber} • {student.semester} Semester</div>
                        </div>
                      </div>
                    </button>
                  ))
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <User className="w-8 h-8 mx-auto mb-2 opacity-50" />
                    <p>No students found matching "{searchQuery}"</p>
                  </div>
                )}
              </div>
            )}

            {/* Selected Student Display */}
            {selectedStudent && (
              <Card className="p-4 bg-blue-50 border-2 border-blue-200">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                    <User className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold text-blue-900">{selectedStudent.name}</div>
                    <div className="text-sm text-blue-700">{selectedStudent.rollNumber}</div>
                  </div>
                </div>
                <div className="text-sm text-blue-600 space-y-1">
                  <div>📧 {selectedStudent.email}</div>
                  <div>🎓 {selectedStudent.semester} Semester</div>
                </div>
              </Card>
            )}

            {/* Login Button */}
            <Button
              onClick={handleLogin}
              disabled={!selectedStudent}
              className="w-full h-12 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
            >
              {selectedStudent ? `Continue as ${selectedStudent.name.split(' ')[0]}` : 'Select a student to continue'}
            </Button>
          </div>
        </Card>

        {/* Quick Access */}
        <Card className="p-4 border-0 shadow-lg bg-white/60 backdrop-blur-sm">
          <div className="text-center space-y-2">
            <h3 className="font-semibold text-gray-800">Quick Access</h3>
            <p className="text-sm text-gray-600">Type your name or roll number in the search box above</p>
            <div className="flex flex-wrap justify-center gap-2 mt-3">
              {['Rahul', 'Priya', 'Amit', 'Sneha'].map((name) => (
                <button
                  key={name}
                  onClick={() => setSearchQuery(name)}
                  className="px-3 py-1 bg-white rounded-full text-sm text-gray-600 hover:bg-blue-50 hover:text-blue-600 transition-colors border border-gray-200"
                >
                  {name}
                </button>
              ))}
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}