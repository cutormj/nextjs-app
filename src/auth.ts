import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import GitHubProvider from 'next-auth/providers/github';
import dbConnect from '@/lib/mongo';
import User from '@/models/User';

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
          prompt: 'consent',
          access_type: 'offline',
          response_type: 'code',
        },
      },
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
      authorization: {
        params: {
          prompt: 'consent',
          access_type: 'offline',
          response_type: 'code',
        },
      },
    }),
  ],
  callbacks: {
    async signIn({ user, profile }) {
      // Log user sign-in details
      console.log('User signed in:', user);
      console.log('User details from provider:', profile);

      // Connect to the database
      await dbConnect();

      // Check if the user already exists
      const existingUser = await User.findOne({ email: user.email });

      // If the user does not exist, create a new user and profile
      if (!existingUser) {
        const username = user.name ? user.name.replace(/\s+/g, '').toLowerCase() : 'defaultusername';

        const newUser = await User.create({
          name: user.name || 'Default Name',
          email: user.email,
          image: user.image,
          username: username,
          role: 'user', // Set default role to 'user'
          profile: {
            bio: 'This is a default bio', // Set a default bio for the profile
          },
          links: [], // Initialize with an empty array of links
          createdAt: new Date(),
          updatedAt: new Date(),
        });

        console.log('User and profile added', newUser);
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
