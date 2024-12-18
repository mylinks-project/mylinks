'use server';

// Function to verify reCAPTCHA token with Google
export const verifyRecaptcha = async (token: string): Promise<boolean> => {
    const secretKey = process.env.RECAPTCHA_SECRET_KEY; // Secret key from Google Admin Console

    const response = await fetch('https://www.google.com/recaptcha/api/siteverify', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
            secret: secretKey || '',
            response: token,
        }),
    });

    const data = await response.json();
    
    // Ensure "success" is true and "score" is above 0.5 for higher security
    return data.success && data.score >= 0.5;
};