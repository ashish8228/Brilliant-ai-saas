import { auth } from "@clerk/nextjs/server";
import { GoogleGenAI } from "@google/genai";
import { NextResponse } from "next/server";

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY
});

export async function POST(req: Request) {
    try {
        const { userId } = await auth();
        const body = await req.json();
        const { message } = body;

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 })
        }

        if (!process.env.GEMINI_API_KEY) {
            return new NextResponse("Gemini API key not configured", {
                status: 500,
            });
        }

        if (!message) {
            return new NextResponse("Message are required", {
                status: 400
            })
        }

        const response = await ai.models.generateContent({
            model: "gemini-3-flash-preview",
            contents: message,
        });

        return NextResponse.json({
            content: response.text
        });
    } catch (error) {
        console.log("[CONVERSATION_ERROR]", error);
        return new NextResponse("INternal error", { status: 500 });
    }
}
