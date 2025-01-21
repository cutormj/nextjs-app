import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import dbConnect from "@/lib/mongo";
import User from "@/models/User";

export const {
    handlers: { GET, POST },
    auth,
    signIn,
    signOut,
} = NextAuth({
    session: {
        strategy: 'jwt',
    },
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
            authorization: {
                params: {
                    prompt: "consent",
                    access_type: "offline",
                    response_type: "code",
                },
            },
        }),
        GitHubProvider({
            clientId: process.env.GITHUB_CLIENT_ID!,
            clientSecret: process.env.GITHUB_CLIENT_SECRET!,
            authorization: {
                params: {
                    prompt: "consent",
                    access_type: "offline",
                    response_type: "code",
                },
            },
        }),
    ],
    callbacks: {
        async signIn({ user, profile }) {
            // Just allow the sign-in
            console.log("User signed in:", user);
            console.log("User details from provider:", profile);
            
            await dbConnect();
            const existingUser = await User.findOne({ email: user.email })

            if(!existingUser){
                await User.create({
                    name: user.name,
                    email: user.email,
                    image: user.image,
                    createdAt: new Date(),
                })
                console.log("User is added")
            }

            return true;
        },
        async session({ session, token }) {
            // Ensure the session.user has the correct type
            session.user = token.user as typeof session.user;
            return session;
        },
        async jwt({ token, user }) {
            if (user) {
                // Add user info to the token
                token.user = user;
            }
            return token;
        },
    },
});
