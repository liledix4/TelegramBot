export default {
    async fetch(request, env, ctx) {
        if (request.method === "POST") {
            const payload = await request.json();
            if ('message' in payload) {
                const chatId = payload.message.chat.id;
                const input = String(payload.message.text);
                const user_firstname = String(payload.message.from.first_name);
                const response = `${user_firstname} said ${input}!!!!`;
                await this.sendMessage(env.API_KEY, chatId, response);
            }
        }
        return new Response('OK');
    },
    async sendMessage(apiKey, chatId, text) {
        const url = `https://api.telegram.org/bot${apiKey}/sendMessage?chat_id=${chatId}&text=${text}`;
        const data = await fetch(url).then(resp => resp.json());
    }
};