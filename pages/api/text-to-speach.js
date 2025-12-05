// import fs from "fs";
// import fetch from "node-fetch";

// // Eleven Labs API key & Voice ID
// const API_KEY = "7751dec2849769f6acfa4dca4281355c54ab5ddc73ba9dc4e0e4d71675b63fdc";
// const VOICE_ID = "pNInz6obpgDQGcFmaJgB";

// // Predefined 10 quotes
// const quotes = [
//   "The best way to get started is to quit talking and begin doing.",
//   "Don't let yesterday take up too much of today.",
//   "It's not whether you get knocked down, it's whether you get up.",
//   "If you are working on something exciting, it will keep you motivated.",
//   "Success is not in what you have, but who you are.",
//   "The harder you work for something, the greater you'll feel when you achieve it.",
//   "Dream bigger. Do bigger.",
//   "Don’t stop when you’re tired. Stop when you’re done.",
//   "Little things make big days.",
//   "It’s going to be hard, but hard does not mean impossible."
// ];

// export default async function handler(req, res) {
//   if (req.method !== "GET") {
//     return res.status(405).json({ message: "Method not allowed" });
//   }

//   try {
//     for (let i = 0; i < quotes.length; i++) {
//       const text = quotes[i];
//       const filename = `id_${i + 1}.mp3`;

//       const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${VOICE_ID}`, {
//         method: "POST",
//         headers: {
//           "xi-api-key": API_KEY,
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           text,
//           voice_settings: { stability: 0.7, similarity_boost: 0.75 },
//         }),
//       });

//       if (!response.ok) throw new Error(`Failed for quote #${i + 1}`);

//       const buffer = Buffer.from(await response.arrayBuffer());
//       fs.writeFileSync(filename, buffer);
//       console.log(`Saved: ${filename}`);
//     }

//     res.status(200).json({ message: "All 10 audio files generated!" });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Error generating audio files", error: err.message });
//   }
// }
import fs from "fs";
import path from "path";
import fetch from "node-fetch";

const API_KEY = "7751dec2849769f6acfa4dca4281355c54ab5ddc73ba9dc4e0e4d71675b63fdc";

// Quotes by Type
const QUOTES = {
  break: [
  "Second half reloaded — let’s go stronger!",
    "Afternoon success belongs to those who stay consistent.",
    "Now is the time to convert leads into results.",
    "Don't slow down — speed up!",
    "One strong afternoon can change the entire day’s numbers.",
    "Push harder — the finish line is getting closer.",
    "Your best calls might still be ahead of you.",
    "You’ve reset — now rise!",
    "Momentum wins targets. Keep the rhythm.",
    "Every follow-up is a step closer to closing.",
    "Stay hungry. Stay driven.",
    "Winners don’t rely on the morning — they dominate the afternoon.",
    "Your effort now defines your closing achievements.",
    "Be the reason the team finishes the day with pride.",
    "Half the day is gone — the best half starts now!",
    "Don’t let leads cool down — bring heat!",
    "Confidence ON. Distraction OFF.",
    "Turn your afternoon into a closing machine.",
    "Push for progress, not perfection.",
    "Customers decide fast — help them say ‘Yes’.",
    "Mid-day is where champions rise.",
    "Finish the second half with purpose and power."
  ],
  exit: [
   "Last hour, best hour — finish strong!",
    "Close the day with pride, not regret.",
    "Your final push today builds tomorrow’s momentum.",
    "One more call can change the whole day.",
    "End the day like a champion — strong and confident.",
    "Results come to those who finish, not those who quit early.",
    "If you didn’t give up today, you already won.",
    "Push now so tomorrow becomes easier.",
    "Don't leave success for tomorrow — close it today.",
    "Your dedication in the last hour defines you as a closer.",
    "Stay sharp — great closers don’t slow down near the finish line.",
    "Every minute counts — use them wisely.",
    "Day isn’t over until you decide it is.",
    "End with excellence, not exhaustion.",
    "Success is built in the moments when others slow down.",
    "Finish today like you want to start tomorrow.",
    "One strong close = one step closer to your monthly target.",
    "Don’t leave leads hanging — resolve, follow up, close.",
    "A closer’s power is in the final push.",
    "You’ve made progress; now make results.",
    "Close strong so you go home strong.",
    "Today’s closing effort shapes tomorrow’s success."
  ],
  entry: [
   "A fresh start — let’s make today unbeatable!",
    "Your first call sets your momentum. Begin strong!",
    "Today’s numbers start now. Own them!",
    "Energy high, focus sharp — targets in sight!",
    "Your morning discipline decides your evening success.",
    "Every lead is a new opportunity — go capture it!",
    "Start fast, finish faster!",
    "Be the reason the team hits record numbers today.",
    "A powerful day starts with a powerful mindset.",
    "Success doesn’t wait — start taking action now.",
    "Your effort today writes your success story.",
    "Let's turn potential into performance.",
    "Winners act early. Be the first to close today.",
    "Focus on progress, not perfection — keep moving.",
    "Your tone, confidence, and attitude move sales.",
    "Make today better than yesterday.",
    "You came to work — now let’s work to win!",
    "Your morning calls build the whole day’s momentum.",
    "If you want results, start creating them now.",
    "Every target is achievable — break it step by step.",
    "Mindset ON, excuses OFF.",
    "Let’s make today the highest-performing day of the week."
  ],
};

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { type, voiceId } = req.body;

  if (!type || !voiceId) {
    return res.status(400).json({ message: "Missing type or voiceId in request" });
  }

  if (!QUOTES[type]) {
    return res.status(400).json({ message: "Invalid type. Must be break, exit, or entry" });
  }

  try {
    const selectedQuotes = QUOTES[type];

    const folderPath = path.join(process.cwd(), "public", "audio", type);

    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath, { recursive: true });
    }

    for (let i = 0; i < selectedQuotes.length; i++) {
      const text = selectedQuotes[i];
      const filename = `day_${i + 1}.mp3`;
      const filePath = path.join(folderPath, filename);

      const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`, {
        method: "POST",
        headers: {
          "xi-api-key": API_KEY,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text,
          voice_settings: { stability: 0.7, similarity_boost: 0.75 },
        }),
      });

      if (!response.ok) throw new Error(`Failed for quote #${i + 1}`);

      const buffer = Buffer.from(await response.arrayBuffer());
      fs.writeFileSync(filePath, buffer);
      console.log(`Saved: ${filePath}`);
    }

    res.status(200).json({
      message: `Audio generated successfully for type: ${type}`,
      folder: `/public/audio/${type}`,
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error generating audio", error: err.message });
  }
}
