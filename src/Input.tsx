import React, { useState } from 'react';
import axios from 'axios';


const ChatBot: React.FC = () => {
    const [message, setMessage] = useState('');

    const handleClick = async () => {
        const token = '6562462799:AAERQfeKeAd_wjBekNYWJwFyvuiaHqBYM6U';
        const chatId = 'YOUR_CHAT_ID'; // Replace with your chat ID or the chat ID you want to send messages to
        const url = `https://api.telegram.org/bot${token}/sendMessage`;

        try {
            const response = await axios.post(url, {
                chat_id: chatId,
                text: message,
            });
            console.log('Message sent:', response.data);
        } catch (error) {
            console.error('Error sending message to Telegram:', error);
        }
    };

    return (
        <div>
            <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your message here"
            />
            <button onClick={handleClick}>Send Message</button>
        </div>
    );
};