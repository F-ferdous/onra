import { NextRequest } from "next/server";
import { Sandbox } from "@e2b/code-interpreter";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  try {
    const { code, language } = await req.json();
    if (typeof code !== "string" || !code.trim()) {
      return new Response(JSON.stringify({ error: "Invalid code" }), { status: 400 });
    }

    // Create a sandbox, using env E2B_API_KEY on server
    const sandbox = await Sandbox.create();

    // Optionally switch kernel based on language; default supports Python & JS
    const exec = await sandbox.runCode(code);

    await sandbox.close();

    return new Response(
      JSON.stringify({
        text: exec.text ?? "",
        results: exec.results ?? [],
        logs: exec.logs ?? [],
        error: exec.error ?? null,
      }),
      { headers: { "Content-Type": "application/json" } }
    );
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err?.message || "Execution error" }), { status: 500 });
  }
}