# MCP CV Frontend 🚀

A modern, interactive CV chat application built with Next.js that allows users to ask questions about your CV and experience through an AI-powered chat interface. The application also includes an email functionality to send messages directly from the interface.

## ✨ Features

- **Interactive CV Chat**: Ask questions about your professional experience, skills, education, and background
- **Real-time Responses**: Get instant answers powered by your MCP (Model Context Protocol) backend
- **Email Integration**: Send emails directly through the application interface
- **Beautiful UI**: Modern, responsive design with smooth animations and loading states
- **Progressive Loading**: Engaging loading messages that keep users informed during backend processing
- **Responsive Design**: Works seamlessly on desktop and mobile devices

## 🌐 Live Demo

**🔗 [Visit the Live Application](https://frontend-two-rouge-77.vercel.app/)**

## 🛠️ Technology Stack

- **Framework**: Next.js 14.2.25
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Icons**: Lucide React
- **Deployment**: Vercel
- **Backend**: MCP Server (deployed on Render)

## 🚀 Getting Started

### Prerequisites

Before running the application, make sure you have:

- Node.js 18.0 or later
- npm, yarn, pnpm, or bun package manager
- A running MCP backend server

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd Frontend
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   # or
   bun install
   ```

3. **Run the development server**

   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   # or
   bun dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000) to see the application.

## 📁 Project Structure

```
Frontend/
├── app/
│   ├── page.tsx          # Main application page
│   ├── layout.tsx        # Root layout
│   └── globals.css       # Global styles
├── components/
│   └── ui/              # Reusable UI components
│       ├── button.tsx
│       ├── card.tsx
│       ├── input.tsx
│       └── ...
├── lib/
│   └── utils.ts         # Utility functions
├── public/              # Static assets
└── ...configuration files
```

## 🔧 Configuration

### Backend Integration

The application is configured to connect to your MCP backend server:

- **Chat API**: `https://mcp-backend-jfqu.onrender.com/tools/rag`
- **Email API**: `https://mcp-backend-jfqu.onrender.com/tools/email`

### API Endpoints

#### Chat Endpoint

```typescript
POST https://mcp-backend-jfqu.onrender.com/tools/rag
Content-Type: application/json

{
  "question": "What was my role at my last position?"
}
```

#### Email Endpoint

```typescript
POST https://mcp-backend-jfqu.onrender.com/tools/email
Content-Type: application/json

{
  "recipient": "recipient@example.com",
  "subject": "Subject Line",
  "body": "Email content here"
}
```

## 🚀 Deployment

### Vercel Deployment (Current)

The application is deployed on Vercel and automatically deploys from the main branch.

**Live URL**: [https://frontend-two-rouge-77.vercel.app/](https://frontend-two-rouge-77.vercel.app/)

#### Deploy Your Own

1. **Fork this repository**

2. **Deploy to Vercel**

   - Connect your GitHub account to Vercel
   - Import your forked repository
   - Vercel will automatically detect it's a Next.js project
   - Deploy with default settings

3. **Environment Variables** (if needed)
   - Currently, the app uses hardcoded API endpoints
   - For production, consider using environment variables for API URLs

### Alternative Deployment Options

#### Build for Production

```bash
npm run build
npm run start
```

#### Docker Deployment

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

## 🎨 Customization

### Styling

- The application uses Tailwind CSS for styling
- UI components are built with shadcn/ui
- Customize colors and themes in `tailwind.config.js`

### Backend URLs

- Update API endpoints in `app/page.tsx`
- Search for `https://mcp-backend-jfqu.onrender.com` to find all backend calls

## 📱 Usage

### Chat Interface

1. Type your question about the CV in the chat input
2. Press Enter or click Send
3. Wait for the AI-powered response
4. View beautiful loading animations during processing

### Email Feature

1. Fill in the recipient, subject, and body fields
2. Click "Send Email"
3. Receive confirmation in the chat interface

## 🐛 Troubleshooting

### Common Issues

1. **Loading issues**: Check if the backend server is running
2. **CORS errors**: Ensure proper CORS headers on the backend
3. **Build errors**: Check Node.js version compatibility
4. **Hydration errors**: Clear browser cache and restart dev server

### Debug Mode

Check browser console for detailed error messages and API response logs.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is part of the MCP For My CV system. See the main repository for license details.

## 🙋‍♂️ Support

For support or questions:

- Create an issue in the repository
- Check the backend server status at `https://mcp-backend-jfqu.onrender.com`
- Verify the live demo at [https://frontend-two-rouge-77.vercel.app/](https://frontend-two-rouge-77.vercel.app/)

---

Built with ❤️ using Next.js and deployed on Vercel
