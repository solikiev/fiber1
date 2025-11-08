# Fiber Intake Tracker

A modern, production-ready web application for tracking your daily fiber intake with customizable goals and visual progress indicators.

![Fiber Tracker Screenshot](https://github.com/user-attachments/assets/bc7ef751-551e-427e-b742-e8df056e78bf)

## Features

### 📊 Daily Fiber Tracking
- Add fiber intake entries with amount (grams) and optional description
- View total fiber intake for any selected day
- Manage all entries with edit and delete functionality

### 🎯 Customizable Target Goals
- Set your own minimum and maximum daily fiber targets
- No default values - personalize your health goals
- Persistent storage of your target settings

### 🚦 Color-Coded Status System
- **Green**: Within your target range (on target)
- **Yellow**: Below your minimum (needs more fiber)
- **Red**: Above your maximum (exceeded target)

### 📅 Interactive Calendar View
- Monthly calendar showing your fiber intake history
- Daily totals displayed directly on calendar days
- Color-coded calendar cells based on your status
- Easy navigation between months
- Quick "Today" button to jump to current date

### ✏️ Entry Management
- Edit existing entries to update amounts or descriptions
- Delete entries with confirmation dialog
- Real-time updates to totals and status indicators

### 💾 Data Persistence
- All data stored locally in your browser (localStorage)
- No account or login required
- Data persists across browser sessions
- Complete privacy - your data never leaves your device

## Tech Stack

- **Next.js 14+** with App Router
- **React 18** with TypeScript
- **Tailwind CSS** for modern, responsive styling
- **localStorage** for client-side data persistence

## Getting Started

### Prerequisites
- Node.js 18+ and npm

### Installation

1. Clone the repository:
```bash
git clone https://github.com/solikiev/fiber1.git
cd fiber1
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Building for Production

```bash
npm run build
npm start
```

## Deployment

This application is ready for deployment on [Vercel](https://vercel.com):

1. Push your code to GitHub
2. Import the project in Vercel
3. Deploy with zero configuration needed

Or use the Vercel CLI:
```bash
vercel
```

## Usage Guide

### Setting Your Target Goals
1. Click "Set Targets" in the Daily Target Goals section
2. Enter your minimum daily fiber goal (e.g., 20g)
3. Enter your maximum daily fiber goal (e.g., 25g)
4. Click "Save" to apply your targets

### Adding Fiber Entries
1. Select a date from the calendar (default is today)
2. Click "+ Add Fiber Entry"
3. Enter the fiber amount in grams
4. Optionally add a description (e.g., "Apple", "Oatmeal")
5. Click "Add" to save the entry

### Managing Entries
- **Edit**: Click "Edit" next to any entry to modify it
- **Delete**: Click "Delete" to remove an entry (with confirmation)
- View your daily total and status in the left panel

### Calendar Navigation
- Click on any day to view/edit entries for that date
- Use "← Prev" and "Next →" to navigate between months
- Click "Today" to quickly return to the current date
- Selected day has a blue border
- Today's date has a lighter blue border

### Understanding Status Colors
The application provides visual feedback based on your targets:
- **Green background**: You're within your target range ✓
- **Yellow background**: You're below your minimum target ↓
- **Red background**: You've exceeded your maximum target ↑

## Project Structure

```
fiber1/
├── app/
│   ├── page.tsx          # Main application page
│   ├── layout.tsx        # Root layout
│   └── globals.css       # Global styles
├── components/
│   ├── Calendar.tsx      # Monthly calendar view
│   ├── AddEntryForm.tsx  # Add entry form
│   ├── EntryList.tsx     # Entry list with edit/delete
│   └── TargetSettings.tsx # Target goal settings
├── lib/
│   ├── types.ts          # TypeScript type definitions
│   ├── storage.ts        # localStorage utilities
│   └── utils.ts          # Helper functions
├── package.json          # Dependencies and scripts
├── tsconfig.json         # TypeScript configuration
├── tailwind.config.js    # Tailwind CSS configuration
└── next.config.js        # Next.js configuration
```

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## Browser Compatibility

Works with all modern browsers that support:
- localStorage API
- ES2015+ JavaScript features
- CSS Grid and Flexbox

## Privacy

All data is stored locally in your browser using localStorage. No data is sent to any server, and no analytics or tracking is performed. Your fiber intake data remains completely private on your device.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open source and available under the MIT License.

## Support

For issues, questions, or suggestions, please open an issue on GitHub.

---

Made with ❤️ for a healthier lifestyle