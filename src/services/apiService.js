import axios from 'axios';

const API_URL = 'https://api.quicksell.co/v1/internal/frontend-assignment';

export const fetchTickets = async () => {
    try {
        console.log('Calling API:', API_URL);
        const response = await axios.get(API_URL);
        console.log('API response:', response);
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        return { tickets: [], users: [] }; // Return an empty structure if there’s an error
    }
};
