/* eslint-disable */
// const apiUrl = 'http://localhost:3000';
const apiUrl = 'https://pfback-osdi.onrender.com';

export const createPayment = async (data: any) => {
    try {
        const response = await fetch(`${apiUrl}/payments`, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        const result = await response.json();
        return result;
    } catch (error) {
        console.log(error);
    }
};