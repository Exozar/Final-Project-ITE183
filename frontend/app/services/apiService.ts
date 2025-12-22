import { getAccessToken } from "../lib/action";

// Hardcode the backend URL for now
const API_BASE_URL = "http://localhost:8000";

function getCookieValue(name: string): string | null {
    if (typeof document === 'undefined') return null;

    const parts = document.cookie.split(';').map(v => v.trim());
    const match = parts.find(v => v.startsWith(`${name}=`));
    if (!match) return null;
    return decodeURIComponent(match.substring(name.length + 1));
}

async function getToken(): Promise<string | undefined> {
    if (typeof window === 'undefined') {
        return await getAccessToken();
    }

    const token = getCookieValue('session_access_token') || undefined;
    console.log('Token from cookie:', token);
    return token;
}

const apiService = {
    get: async function (url: string): Promise<any> {
        console.log('GET', url);

        const token = await getToken();

        const headers: Record<string, string> = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        };

        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }

        return fetch(`${API_BASE_URL}${url}`, {
            method: 'GET',
            headers
        })
        .then(async response => {
            const contentType = response.headers.get('content-type');
            if (contentType && contentType.includes('application/json')) {
                const json = await response.json();
                if (!response.ok) throw json;
                console.log('Response:', json);
                return json;
            } else {
                const text = await response.text();
                console.error('Non-JSON response:', text);
                throw new Error(text);
            }
        })
        .catch(error => {
            console.error('GET error:', error);
            throw error;
        });
    },

    post: async function (url: string, data: any): Promise<any> {
        console.log('POST', url, data);

        const token = await getToken();

        const isFormData = typeof FormData !== 'undefined' && data instanceof FormData;

        const headers: Record<string, string> = {
            'Accept': 'application/json',
        };

        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }

        if (!isFormData) {
            headers['Content-Type'] = 'application/json';
        }

        return fetch(`${API_BASE_URL}${url}`, {
            method: 'POST',
            headers,
            body: isFormData ? data : JSON.stringify(data)
        })
        .then(async response => {
            const contentType = response.headers.get('content-type');
            if (contentType && contentType.includes('application/json')) {
                const json = await response.json();
                if (!response.ok) throw json;
                console.log('Response:', json);
                return json;
            } else {
                const text = await response.text();
                console.error('Non-JSON response:', text);
                throw new Error(text);
            }
        })
        .catch(error => {
            console.error('POST error:', error);
            throw error;
        });
    },

    postWithoutToken: async function (url: string, data: any): Promise<any> {
        console.log('POST (no token)', url, data);

        const isFormData = typeof FormData !== 'undefined' && data instanceof FormData;

        const headers: Record<string, string> = {
            'Accept': 'application/json'
        };

        if (!isFormData) {
            headers['Content-Type'] = 'application/json';
        }

        return fetch(`${API_BASE_URL}${url}`, {
            method: 'POST',
            headers,
            body: isFormData ? data : JSON.stringify(data)
        })
        .then(async response => {
            const contentType = response.headers.get('content-type');
            if (contentType && contentType.includes('application/json')) {
                const json = await response.json();
                if (!response.ok) throw json;
                console.log('Response:', json);
                return json;
            } else {
                const text = await response.text();
                console.error('Non-JSON response:', text);
                throw new Error(text);
            }
        })
        .catch(error => {
            console.error('POST (no token) error:', error);
            throw error;
        });
    }
};

export default apiService;
