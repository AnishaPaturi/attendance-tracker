// import { Image } from 'expo-image';
// import { Platform, StyleSheet } from 'react-native';

// import { HelloWave } from '@/components/HelloWave';
// import ParallaxScrollView from '@/components/ParallaxScrollView';
// import { ThemedText } from '@/components/ThemedText';
// import { ThemedView } from '@/components/ThemedView';

// export default function HomeScreen() {
//   return (
//     <ParallaxScrollView
//       headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
//       headerImage={
//         <Image
//           source={require('@/assets/images/partial-react-logo.png')}
//           style={styles.reactLogo}
//         />
//       }>
//       <ThemedView style={styles.titleContainer}>
//         <ThemedText type="title">Welcome!</ThemedText>
//         <HelloWave />
//       </ThemedView>
//       <ThemedView style={styles.stepContainer}>
//         <ThemedText type="subtitle">Step 1: Try it</ThemedText>
//         <ThemedText>
//           Edit <ThemedText type="defaultSemiBold">app/(tabs)/index.tsx</ThemedText> to see changes.
//           Press{' '}
//           <ThemedText type="defaultSemiBold">
//             {Platform.select({
//               ios: 'cmd + d',
//               android: 'cmd + m',
//               web: 'F12',
//             })}
//           </ThemedText>{' '}
//           to open developer tools.
//         </ThemedText>
//       </ThemedView>
//       <ThemedView style={styles.stepContainer}>
//         <ThemedText type="subtitle">Step 2: Explore</ThemedText>
//         <ThemedText>
//           {`Tap the Explore tab to learn more about what's included in this starter app.`}
//         </ThemedText>
//       </ThemedView>
//       <ThemedView style={styles.stepContainer}>
//         <ThemedText type="subtitle">Step 3: Get a fresh start</ThemedText>
//         <ThemedText>
//           {`When you're ready, run `}
//           <ThemedText type="defaultSemiBold">npm run reset-project</ThemedText> to get a fresh{' '}
//           <ThemedText type="defaultSemiBold">app</ThemedText> directory. This will move the current{' '}
//           <ThemedText type="defaultSemiBold">app</ThemedText> to{' '}
//           <ThemedText type="defaultSemiBold">app-example</ThemedText>.
//         </ThemedText>
//       </ThemedView>
//     </ParallaxScrollView>
//   );
// }

// const styles = StyleSheet.create({
//   titleContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     gap: 8,
//   },
//   stepContainer: {
//     gap: 8,
//     marginBottom: 8,
//   },
//   reactLogo: {
//     height: 178,
//     width: 290,
//     bottom: 0,
//     left: 0,
//     position: 'absolute',
//   },
// });


import { useState } from "react";
import { Dashboard } from "./components/Dashboard";
import { SubjectsBreakdown, Subject } from "./components/SubjectsBreakdown";
import { Reminders } from "./components/Reminders";
import { BottomNavigation } from "./components/BottomNavigation";
import { Login } from "./components/Login";
import { User } from "lucide-react";

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
      default:
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