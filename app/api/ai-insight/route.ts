import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { tps, gasPrice, blockTime, tvl, peakTps } = await request.json();

    // If no API key, return rule-based fallback
    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json({
        insight: generateFallbackInsight(tps, gasPrice, blockTime),
        source: 'rule-based'
      });
    }

    // Dynamic import to avoid build-time errors
    const OpenAI = (await import('openai')).default;
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const prompt = `You are an AI analyst for Mantle Network (Ethereum L2). Analyze these real-time metrics and provide ONE brief, actionable insight (max 100 chars):

Network Metrics:
- Current TPS: ${tps} transactions/second
- Peak TPS: ${peakTps}
- Gas Price: ${gasPrice} Gwei
- Block Time: ${(blockTime / 1000).toFixed(1)} seconds
- Total Value Locked: $${tvl}M

Consider:
1. Network congestion level
2. Transaction cost efficiency  
3. Best time for transactions
4. Any anomalies or notable patterns

Respond with ONLY the insight text, no quotes or explanation. Be specific and actionable.`;

    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: 'You are a blockchain network analyst. Give brief, technical insights about network conditions. Be concise and actionable.'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      max_tokens: 60,
      temperature: 0.7,
    });

    const insight = completion.choices[0]?.message?.content?.trim() || 
      generateFallbackInsight(tps, gasPrice, blockTime);

    return NextResponse.json({
      insight,
      source: 'openai',
      model: 'gpt-3.5-turbo'
    });

  } catch (error) {
    console.error('AI Insight Error:', error);
    
    // Return fallback on error
    return NextResponse.json({
      insight: 'Network operating normally. Mantle L2 ready for transactions.',
      source: 'fallback',
      error: true
    });
  }
}

function generateFallbackInsight(tps: number, gasPrice: string, blockTime: number): string {
  const gas = parseFloat(gasPrice);
  
  if (tps === 0 && gas < 0.05) {
    return 'Ultra-low activity detected. Optimal conditions for batch operations.';
  }
  if (tps > 5) {
    return `High throughput: ${tps} TPS. Network handling load efficiently.`;
  }
  if (gas < 0.02) {
    return `Gas at ${gas.toFixed(4)} Gwei. Excellent time for contract deployments.`;
  }
  if (blockTime < 2000) {
    return 'Fast block times. Transactions confirming quickly.';
  }
  
  return 'Network stable. Standard conditions for all transaction types.';
}
