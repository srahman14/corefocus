# CoreFocus

A comprehensive habit tracking and personal productivity app designed to help you master your daily habits, achieve your goals, and maintain focus. CoreFocus combines multiple productivity tools into one beautiful, intuitive platform.

## Core Features

### Habit Tracker

- **Daily Tracking** - Log your habits every single day with one-click completion
- **Streak Visualization** - See your consistency at a glance with visual streak indicators
- **Heatmaps** - Track activity patterns across day, week, month, and year timeframes
- **Progress Analytics** - Detailed insights into your completed habits
- **Custom Habits** - Create unlimited habits tailored to your lifestyle
- **Real-time Sync** - Your habits are automatically synced across all devices

### Goal Board

- **Goal Setting** - Set goals with clear objectives and clear deadlines
- **Visual Progress** - Visualise your goals in a unique ciruclar UI orbit
- **Goal Reflection** - Adjust and refine your strategies based on performance

### Read Route (Journal)

- **Rich Text Journaling** - Capture thoughts and ideas with a beautiful editor
- **Tag Organization** - Organize entries by custom tags for easy retrieval
- **Search & Filter** - Find past entries quickly with powerful search functionality

### Focus Camp (Pomodoro Timer)

- **Pomodoro Sessions** - Customizable work intervals with built-in break timers
- **Session Logging** - Automatic tracking of completed focus sessions
- **Focus Analytics** - Monitor your focus hours and productivity trends
- **Real-time Notifications** - Receive audio notifications when sessions and breaks complete

### Analytics Dashboard

- **Interactive Charts** - Visualize habit completion rates and goal progress
- **Habit Heatmaps** - Identify patterns in your behavior with color-coded heatmaps
- **Streak Tracking** - Monitor your longest streaks and current performance
- **Performance Metrics** - Track focus hours, completed goals, and total habits

## Additional Features

- **Dark Mode Support** - Easy on the eyes with full dark mode implementation
- **Responsive Design** - Seamless experience across mobile, tablet, and desktop
- **Real-time Synchronization** - Changes sync instantly across all your devices
- **User Authentication** - Secure login and account management
- **Persistent Storage** - All data safely stored in Firebase Firestore
- **Beautiful UI** - Modern, intuitive interface with smooth animations

## 📁 Project Structure

```
corefocus-w/
├── src/
│   ├── app/
│   │   ├── (auth)/                 # Authentication routes
│   │   │   ├── login/
│   │   │   ├── signup/
│   │   │   └── steps/
│   │   ├── (dashboard_app)/        # Main application routes
│   │   │   ├── dashboard/          # Dashboard with analytics
│   │   │   │   ├── analytics/      # Analytics dashboard
│   │   │   │   └── viewer/         # Habit/Goal viewer
│   │   │   ├── goalboard/          # Goal Visulisation
│   │   │   ├── journal/            # Journal management
│   │   ├── (main)/                 # Landing page
│   ├── components/
│   ├── context/
│   ├── hooks/
│   ├── store/                      # Zustand state management
│   └── lib/
└── public/
```

## 🛠️ Tech Stack

| Layer                  | Technology                |
| ---------------------- | ------------------------- |
| **Frontend Framework** | Next.js 13+ with React 18 |
| **Styling**            | Tailwind CSS              |
| **State Management**   | Zustand                   |
| **Backend/Database**   | Firebase Firestore        |
| **Authentication**     | Firebase Auth             |
| **UI Components**      | Custom React Components   |
| **Date Handling**      | date-fns                  |

## Getting Started

### Prerequisites

- Node.js 16+
- npm or yarn

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/srahman14/corefocus.git
   cd corefocus
   ```

2. **Install dependencies**

   ```bash
   cd corefocus-w
   npm install
   ```

3. **Configure Firebase**

   - Create a `.env` file in the `corefocus-w` directory (root of Next.js app)
   - Add your Firebase credentials:

   ```env
   NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser

## Learning & Resources

This project demonstrates:

- Modern Next.js patterns with App Router
- Firebase integration for real-time data
- Zustand for lightweight state management
- Tailwind CSS for responsive design
- React hooks and custom hook patterns
- Component composition and reusability

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.
