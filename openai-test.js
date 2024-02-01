import OpenAI from "openai";

const openai = new OpenAI({ apiKey: "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" });

async function main() {
    const completion = await openai.chat.completions.create({
        messages: [{ role: "system", content: "can you create an ideal CV if i give you job description?" }],
        model: "gpt-3.5-turbo",
    });

    console.log(completion.choices[0]);
}

main();