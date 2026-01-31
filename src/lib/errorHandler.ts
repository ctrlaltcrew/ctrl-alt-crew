import { toast } from "@/hooks/use-toast";

export const USER_ERRORS = {
  AUTH_FAILED: "Invalid email or password. Please try again.",
  ACCESS_DENIED: "You don't have permission to access this resource.",
  SAVE_FAILED: "Unable to save changes. Please try again.",
  LOAD_FAILED: "Unable to load data. Please refresh the page.",
  DELETE_FAILED: "Unable to delete. Please try again.",
  NOT_FOUND: "The requested content could not be found.",
} as const;

export const handleError = (error: any, userMessage: string) => {
  // Only log detailed errors in development mode
  if (import.meta.env.DEV) {
    console.error('Dev Error:', error);
  }
  
  // Always show generic message to users
  toast({
    title: "Error",
    description: userMessage,
    variant: "destructive",
  });
};
