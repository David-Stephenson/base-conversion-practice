export const encouragementMessages = [
  "You're getting closer! Keep going! 💪",
  "Good try! Each attempt helps you learn 📚",
  "That's a creative approach! Try again! 🎯",
  "You're making progress! Keep at it! 🌟",
  "Almost there! You've got this! ✨",
  "Keep going! Mistakes are how we learn! 🧠",
  "Don't give up! You're getting better with each try! 🚀",
  "That's an interesting attempt! Let's try again! 🎓",
  "You're putting in the effort - that's what counts! 💫",
  "Every attempt brings you closer to mastery! 🎯"
];

export const successMessages = [
  "Fantastic work! 🎉",
  "You're crushing it! 🌟",
  "Outstanding job! 🏆",
  "You're on fire! 🔥",
  "Brilliant conversion! ⭐",
  "You're mastering this! 🎯",
  "Excellent work! Keep it up! 🚀",
  "You're getting really good at this! 💫",
  "Perfect conversion! You rock! 🎸",
  "Amazing job! You're a natural! 🌠"
];

export const streakMessages = [
  "Your streak is building! 🔥",
  "You're on a roll! 🎲",
  "Unstoppable! 🚀",
  "What a winning streak! 🏆",
  "You're in the zone! 🎯",
  "Keep that streak alive! ⚡",
  "You're on fire! 🔥",
  "Nothing can stop you now! 💫",
  "Incredible streak! 🌟",
  "You're dominating! 👑"
];

export const newProblemMessages = [
  "Ready for a new challenge? 🎯",
  "Let's tackle this one! 💪",
  "Show this number who's boss! 🚀",
  "Time to shine! ⭐",
  "You've got the skills for this! 🎓",
  "Another opportunity to be awesome! 🌟",
  "Let's solve this together! 🤝",
  "Your mind is ready for this! 🧠",
  "You're prepared for this! 📚",
  "Time to show what you know! 💫"
];

export function getRandomMessage(messages: string[]): string {
  return messages[Math.floor(Math.random() * messages.length)];
} 