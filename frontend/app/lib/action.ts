'use server';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

const API_BASE_URL = "http://localhost:8000";

export async function handleLogin(userId: string, accessToken: string, refreshToken: string) {
    const cookieStore = await cookies();


    cookieStore.set('session_userid', userId, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 60 * 60 * 24 * 7, // One week
        path: '/'
    });


    cookieStore.set('session_access_token', accessToken, {
        httpOnly: false,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 60 * 60, // 60 minutes
        path: '/'
    });


    cookieStore.set('session_refresh_token', refreshToken, {
        httpOnly: true,
        secure: false,
        maxAge: 60 * 60 * 24 * 7, // One week
        path: '/'
    });
}


export async function resetAuthCookies() {
    const cookieStore = await cookies();
    cookieStore.set('session_userid', '', { maxAge: 0 });
    cookieStore.set('session_access_token', '', { maxAge: 0 });
    cookieStore.set('session_refresh_token', '', { maxAge: 0 });
}


//
// Get data


export async function getUserId() {
    const cookieStore = await cookies();
    const userId = cookieStore.get('session_userid')?.value
    return userId ? userId : null
}


export async function getAccessToken() {
    const cookieStore = await cookies();
    let accessToken = cookieStore.get('session_access_token')?.value;


    return accessToken;
}


export async function startConversation(userId: string) {
    const token = await getAccessToken();

    if (!token) {
        throw new Error('No access token');
    }

    const response = await fetch(`${API_BASE_URL}/api/chat/start/`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ user_id: userId })
    });

    const contentType = response.headers.get('content-type');

    if (contentType && contentType.includes('application/json')) {
        const json = await response.json();
        if (!response.ok) throw json;
        redirect(`/inbox/${json.id}`);
    }

    const text = await response.text();
    throw new Error(text);
}




