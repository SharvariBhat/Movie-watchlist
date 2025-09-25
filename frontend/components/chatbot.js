// Backend route
router.post('/chatbot', async (req, res) => {
  const prompt = req.body.prompt;
  const response = await axios.post('https://api.openai.com/v1/completions', {
    prompt,
    model: 'text-davinci-003',
    max_tokens: 100,
  }, {
    headers: { Authorization: `Bearer ${process.env.OPENAI_API_KEY}` }
  });

  res.send(response.data.choices[0].text);
});
