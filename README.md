# corefocus
Habit tracking app with additional features such as journaling, time-blocking, heatmaps and more

## Project Structure
```pysqlite
/app
  /dashboard
  /journal
  /goals
  /focus
  /settings
  /auth
/components
/hooks
/lib
/context
/styles
/types
/utils
```
## Tech Stack

Frontend: Next.js + Tailwind CSS
State Mgmt: Context API (or Zustand if needed)
Database: Firebase Firestore (scalable + easy auth integration)
Timer: Custom React hooks or open-source library
Optional Future APIs:
  - Google Calendar API (for TaskSync)
  - OpenAI API (for journaling analysis or smart reflections)

