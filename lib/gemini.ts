import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export const model = genAI.getGenerativeModel({ model: "gemini-3.1-pro" });

export async function generateTaskDescription(title: string) {
  const prompt = `Generate a professional, concise 2-3 sentence task description for a team member given the task title: "${title}". Focus on actionable steps.`;
  const result = await model.generateContent(prompt);
  return result.response.text();
}

export async function suggestTaskPriority(title: string, description: string) {
  const prompt = `Based on the following task, suggest one of these priorities: LOW, MEDIUM, HIGH, URGENT. Return ONLY the word.
  Title: ${title}
  Description: ${description}`;
  const result = await model.generateContent(prompt);
  return result.response.text().trim() as any;
}

export async function generateDashboardSummary(tasks: any[]) {
  const taskSummary = tasks.map(t => `${t.title} (${t.status})`).join(", ");
  const prompt = `You are an AI assistant for a team lead. Based on these active tasks: ${taskSummary}, write a 1-sentence "Focus of the day" summary. Be professional and encouraging.`;
  const result = await model.generateContent(prompt);
  return result.response.text();
}
