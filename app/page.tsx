"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Send, MessageCircle, Mail, Briefcase } from "lucide-react";

// Client-side timestamp component to avoid hydration issues
function ClientTimestamp({ timestamp }: { timestamp: Date }) {
  const [timeString, setTimeString] = useState("");

  useEffect(() => {
    setTimeString(timestamp.toLocaleTimeString());
  }, [timestamp]);

  return <span>{timeString}</span>;
}

interface Message {
  id: string;
  content: string;
  sender: "user" | "assistant";
  timestamp: Date;
}

interface EmailForm {
  recipient: string;
  subject: string;
  body: string;
}

export default function MCPFrontend() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content:
        "Hello! I can help you with questions about your CV and experience. Try asking me about your previous roles, skills, or education.",
      sender: "assistant",
      timestamp: new Date(),
    },
  ]);
  const [currentMessage, setCurrentMessage] = useState("");
  const [emailForm, setEmailForm] = useState<EmailForm>({
    recipient: "",
    subject: "",
    body: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [emailSending, setEmailSending] = useState(false);

  const handleSendMessage = async () => {
    if (!currentMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: currentMessage,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setCurrentMessage("");
    setIsLoading(true);

    // Connect to MCP server endpoint
    try {
      const response = await fetch(
        "https://mcp-backend-jfqu.onrender.com/tools/rag",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({ question: currentMessage }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        const assistantMessage: Message = {
          id: (Date.now() + 1).toString(),
          content:
            data.answer ||
            "I received your message but couldn't process it properly.",
          sender: "assistant",
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, assistantMessage]);
      } else {
        throw new Error(`Server responded with status: ${response.status}`);
      }
    } catch (error) {
      console.error("MCP Server connection error:", error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: `Connection failed: ${
          error instanceof Error ? error.message : "Unknown error"
        }. Make sure your MCP server is running on https://mcp-backend-jfqu.onrender.com`,
        sender: "assistant",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendEmail = async () => {
    if (!emailForm.recipient || !emailForm.subject || !emailForm.body) return;

    setEmailSending(true);

    try {
      const response = await fetch(
        "https://mcp-backend-jfqu.onrender.com/tools/email",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            recipient: emailForm.recipient,
            subject: emailForm.subject,
            body: emailForm.body,
          }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        setEmailForm({ recipient: "", subject: "", body: "" });
        // Add success message to chat
        const successMessage: Message = {
          id: Date.now().toString(),
          content: `Email sent successfully to ${emailForm.recipient}!`,
          sender: "assistant",
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, successMessage]);
      } else {
        throw new Error(
          `Email server responded with status: ${response.status}`
        );
      }
    } catch (error) {
      console.error("Email sending error:", error);
      const errorMessage: Message = {
        id: Date.now().toString(),
        content: `Failed to send email: ${
          error instanceof Error ? error.message : "Unknown error"
        }. Make sure your email service is running.`,
        sender: "assistant",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setEmailSending(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <Briefcase className="h-5 w-5" />
              </div>
              <div>
                <h1 className="font-heading text-xl font-black text-foreground">
                  MCP Server
                </h1>
                <p className="text-sm text-muted-foreground">
                  CV Chat & Email Interface
                </p>
              </div>
            </div>
            <Badge variant="secondary" className="font-medium">
              Coding Challenge
            </Badge>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid gap-8 lg:grid-cols-2">
          {/* Chat Interface */}
          <Card className="flex flex-col">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 font-heading">
                <MessageCircle className="h-5 w-5 text-accent" />
                CV Chat Assistant
              </CardTitle>
              <CardDescription>
                Ask questions about your resume, experience, and background
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-1 flex-col">
              {/* Messages */}
              <div
                className="flex-1 space-y-4 overflow-y-auto rounded-lg bg-muted/30 p-4"
                style={{ minHeight: "400px", maxHeight: "500px" }}
              >
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${
                      message.sender === "user"
                        ? "justify-end"
                        : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-[80%] rounded-lg px-4 py-2 text-sm ${
                        message.sender === "user"
                          ? "bg-primary text-primary-foreground"
                          : "bg-card text-card-foreground border border-border"
                      }`}
                    >
                      <p className="text-pretty">{message.content}</p>
                      <p className={`mt-1 text-xs opacity-70`}>
                        <ClientTimestamp timestamp={message.timestamp} />
                      </p>
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="max-w-[80%] rounded-lg border border-border bg-card px-4 py-2 text-sm text-card-foreground">
                      <div className="flex items-center space-x-2">
                        <div className="h-2 w-2 animate-bounce rounded-full bg-accent"></div>
                        <div
                          className="h-2 w-2 animate-bounce rounded-full bg-accent"
                          style={{ animationDelay: "0.1s" }}
                        ></div>
                        <div
                          className="h-2 w-2 animate-bounce rounded-full bg-accent"
                          style={{ animationDelay: "0.2s" }}
                        ></div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Input */}
              <div className="mt-4 flex space-x-2">
                <Input
                  placeholder="Ask about your CV... (e.g., 'What was my role at my last job?')"
                  value={currentMessage}
                  onChange={(e) => setCurrentMessage(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                  className="flex-1"
                />
                <Button
                  onClick={handleSendMessage}
                  disabled={isLoading || !currentMessage.trim()}
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Email Form */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 font-heading">
                <Mail className="h-5 w-5 text-accent" />
                Send Email Notification
              </CardTitle>
              <CardDescription>
                Send email notifications through the MCP server
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label
                  htmlFor="recipient"
                  className="mb-2 block text-sm font-medium text-foreground"
                >
                  Recipient Email
                </label>
                <Input
                  id="recipient"
                  type="email"
                  placeholder="recipient@example.com"
                  value={emailForm.recipient}
                  onChange={(e) =>
                    setEmailForm((prev) => ({
                      ...prev,
                      recipient: e.target.value,
                    }))
                  }
                />
              </div>

              <div>
                <label
                  htmlFor="subject"
                  className="mb-2 block text-sm font-medium text-foreground"
                >
                  Subject
                </label>
                <Input
                  id="subject"
                  placeholder="Email subject"
                  value={emailForm.subject}
                  onChange={(e) =>
                    setEmailForm((prev) => ({
                      ...prev,
                      subject: e.target.value,
                    }))
                  }
                />
              </div>

              <div>
                <label
                  htmlFor="body"
                  className="mb-2 block text-sm font-medium text-foreground"
                >
                  Message Body
                </label>
                <Textarea
                  id="body"
                  placeholder="Enter your email message..."
                  rows={6}
                  value={emailForm.body}
                  onChange={(e) =>
                    setEmailForm((prev) => ({ ...prev, body: e.target.value }))
                  }
                />
              </div>

              <Button
                onClick={handleSendEmail}
                disabled={
                  emailSending ||
                  !emailForm.recipient ||
                  !emailForm.subject ||
                  !emailForm.body
                }
                className="w-full"
              >
                {emailSending ? (
                  <>
                    <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent"></div>
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="mr-2 h-4 w-4" />
                    Send Email
                  </>
                )}
              </Button>

              <div className="rounded-lg bg-muted/50 p-3">
                <p className="text-sm text-muted-foreground">
                  <strong>Note:</strong> Connect your MCP server backend to
                  enable email functionality. The frontend will make requests to{" "}
                  <code className="rounded bg-muted px-1 py-0.5 text-xs">
                    /api/send-email
                  </code>{" "}
                  endpoint.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Footer */}
        <footer className="mt-12 border-t border-border pt-8">
          <div className="text-center">
            <p className="text-sm text-muted-foreground">
              MCP Server Frontend • Built for Coding Challenge •
              <a href="#" className="ml-1 text-accent hover:underline">
                View Documentation
              </a>
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}
