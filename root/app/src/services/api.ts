const API_URL = 'http://127.0.0.1:8000';

export async function predict(tScore: number) {
  const response = await fetch(`${API_URL}/predict`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      t_score_value: tScore,
    }),
  });

  return response.json();
}
