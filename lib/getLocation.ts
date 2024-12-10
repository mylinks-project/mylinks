export const getLocationData = async (ip: string) => {
    const token = process.env.IPINFO_TOKEN; // Store your IPinfo token securely
    const url = `https://ipinfo.io/${ip}?token=${token}`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Error: ${response.status} ${response.statusText}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching location data:", error);
    }
};