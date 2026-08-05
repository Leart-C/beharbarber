type CurrenctUserResponse = {
    userId: string;
};

export async function getCurrentUser(token:string):Promise<CurrenctUserResponse>{
    const apiUrl = process.env.EXPO_PUBLIC_API_URL;

    if(!apiUrl){
        throw new Error("EXPO_PUBLIC_API_URL is not configured");
    }

    const response = await fetch(`${apiUrl}/api/v1/me`,{
        headers: {
            Authorization: `Bearer ${token}`
        },
    });

    if(!response.ok){
        throw new Error(`Unable to authenticate user: ${response.status}`);
    }

    return response.json();
}