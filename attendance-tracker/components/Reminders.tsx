import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Bell, Heart, AlertCircle, Smile } from "lucide-react";
import { Subject } from "./SubjectsBreakdown";

interface RemindersProps {
  subjects: Subject[];
}

export function Reminders({ subjects }: RemindersProps) {
  const generateReminders = () => {
    const reminders = [];

    subjects.forEach((subject) => {
      const classesNeeded = Math.max(0, Math.ceil(subject.total * 0.75) - subject.attended);
      
      if (subject.percentage >= 80) {
        reminders.push({
          id: `${subject.id}-good`,
          type: "positive",
          subject: subject.abbreviation,
          message: `${subject.abbreviation} loves you ❤️ You're rocking ${subject.percentage}% attendance!`,
          emoji: "🎉",
          color: "bg-green-50 border-green-200"
        });
      } else if (subject.percentage >= 75) {
        reminders.push({
          id: `${subject.id}-ok`,
          type: "neutral",
          subject: subject.abbreviation,
          message: `${subject.abbreviation} is proud of you! You're safely at ${subject.percentage}% 😊`,
          emoji: "👍",
          color: "bg-blue-50 border-blue-200"
        });
      } else if (subject.percentage >= 65) {
        reminders.push({
          id: `${subject.id}-warning`,
          type: "warning",
          subject: subject.abbreviation,
          message: `${subject.abbreviation} is getting worried 😰 – attend ${classesNeeded} more classes to fix this!`,
          emoji: "⚠️",
          color: "bg-yellow-50 border-yellow-200"
        });
      } else if (subject.percentage >= 50) {
        reminders.push({
          id: `${subject.id}-critical`,
          type: "critical",
          subject: subject.abbreviation,
          message: `${subject.abbreviation} hates you right now 🤡 – attend ${classesNeeded} more classes to fix this!`,
          emoji: "🚨",
          color: "bg-red-50 border-red-200"
        });
      } else {
        reminders.push({
          id: `${subject.id}-danger`,
          type: "danger",
          subject: subject.abbreviation,
          message: `${subject.abbreviation} has given up on you 💀 Time for some serious catching up!`,
          emoji: "☠️",
          color: "bg-red-100 border-red-300"
        });
      }
    });

    // Add some fun general reminders
    const generalReminders = [
      {
        id: "general-1",
        type: "fun",
        subject: "General",
        message: "Remember: Attending class is like going to the gym, but for your brain! 🧠💪",
        emoji: "💡",
        color: "bg-purple-50 border-purple-200"
      },
      {
        id: "general-2", 
        type: "fun",
        subject: "Tip",
        message: "Pro tip: Sitting in the front row makes it harder to skip class 😉",
        emoji: "🎯",
        color: "bg-indigo-50 border-indigo-200"
      }
    ];

    return [...reminders, ...generalReminders];
  };

  const reminders = generateReminders();

  const getIconForType = (type: string) => {
    switch (type) {
      case "positive": return Heart;
      case "warning": return AlertCircle;
      case "critical": return AlertCircle;
      case "danger": return AlertCircle;
      default: return Smile;
    }
  };

  return (
    <div className="space-y-4 pb-6">
      <div className="text-center mb-6">
        <h2 className="text-xl font-bold text-gray-800 mb-2">Reminders & Notifications</h2>
        <p className="text-sm text-gray-600">Your attendance buddy has some things to say!</p>
      </div>

      {reminders.map((reminder) => {
        const IconComponent = getIconForType(reminder.type);
        
        return (
          <Card key={reminder.id} className={`p-5 border-2 ${reminder.color} shadow-md hover:shadow-lg transition-all`}>
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-2xl shadow-sm">
                  {reminder.emoji}
                </div>
              </div>
              
              <div className="flex-1 space-y-2">
                <div className="flex items-center space-x-2">
                  <Badge variant="outline" className="text-xs">
                    {reminder.subject}
                  </Badge>
                  <IconComponent className="w-4 h-4 text-gray-500" />
                </div>
                
                <p className="text-sm leading-relaxed text-gray-700">
                  {reminder.message}
                </p>
              </div>
            </div>
          </Card>
        );
      })}

      {/* Motivational Footer */}
      <Card className="p-6 bg-gradient-to-r from-blue-500 to-purple-500 text-white border-0 shadow-lg">
        <div className="text-center space-y-2">
          <Bell className="w-8 h-8 mx-auto" />
          <h3 className="font-semibold">Keep Going! 🚀</h3>
          <p className="text-sm opacity-90">
            Every class you attend brings you closer to your goals. You've got this!
          </p>
        </div>
      </Card>
    </div>
  );
}