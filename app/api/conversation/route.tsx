import { auth } from "@clerk/nextjs/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { GoogleGenAI, ThinkingLevel } from "@google/genai";
import { NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY as any);


export async function POST(req: Request) {
    try {
        const { userId } = await auth();
        const body = await req.json();
        const { message } = body;

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        if (!process.env.GEMINI_API_KEY) {
            return new NextResponse("Gemini API key not configured", { status: 500 });
        }

        if (!message) {
            return new NextResponse("Message is required", { status: 400 });
        }

        const model = genAI.getGenerativeModel({ model: "gemini-3-flash-preview" });

        const result = await model.generateContentStream(message);
        const response = await result.response;
        const text = response.text();

        return NextResponse.json({
            role: "user",
            config: {
                thinkingConfig: {
                    thinkingLevel: ThinkingLevel.LOW,
                },
                systemInstruction: `You are a helpful AI assistant.

Rules:
- Keep answers short, clear, and simple by default.
- Do not give long explanations unless the user asks for them.
- Use beginner-friendly language.
- If the user asks "explain", "why", or "how", then provide detailed answers.
- For coding questions, give concise code examples first.
- Avoid unnecessary paragraphs.
- Be direct and helpful.`,
            },
            content: text
        });
    } catch (error) {
        console.log("[CONVERSATION_ERROR]", error);
        return new NextResponse("Internal error", { status: 500 });
    }
}
