const clerkPublishableKey =
  process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;

const apiUrl =
  process.env.EXPO_PUBLIC_API_URL?.replace(
    /\/+$/,
    "",
  );

if(!clerkPublishableKey){
  throw new Error(
    "Missing EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY in the environment"
  );
}

if(!apiUrl){
  throw new Error(
    "Missing EXPO_PUBLIC_API_URL in the environment",
  );
}

export const env = {
  clerkPublishableKey,
  apiUrl,
} as const;