import OpenAI from "openai"
import { NextResponse } from "next/server"

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export const runtime = "nodejs"

export async function POST(req: Request) {
  try {
    const { query } = await req.json()

    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json({ error: "OpenAI API key not configured" }, { status: 500 })
    }

    if (!query) {
      return NextResponse.json({ error: "Please provide a valid query" }, { status: 400 })
    }

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "You are a helpful assistant. Provide informative and detailed responses." },
        { role: "user", content: query },
      ],
      temperature: 0.7,
      max_tokens: 1500, // Aumentado de 800 a 1500
    })

    const response = completion.choices[0].message.content
    if (!response) {
      return NextResponse.json({ error: "No response generated from OpenAI" }, { status: 500 })
    }

    return NextResponse.json({ response })
  } catch (error: any) {
    console.error("API Error:", error)
    return NextResponse.json({ error: error.message || "An unknown error occurred" }, { status: 500 })
  }
}
