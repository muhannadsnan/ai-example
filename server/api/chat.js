export default defineEventHandler(async (event) => {
    // return { message: 'API route is working!' };
    const body = await readBody(event); // Get the request body
  
    const response = await $fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${useRuntimeConfig().OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body,
    });
  
    return response;
  });
  