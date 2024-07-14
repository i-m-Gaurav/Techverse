import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { connectToDB } from "@/lib/database"; // Ensure database connection
import User from '@/models/User'

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],

  callbacks: {
    async signIn({ user, account, profile }) {
      if (!user.email) {
        console.error("No email provided by authentication provider");
        return false;
      }

      try {
        await connectToDB(); // Connect to the database

        const existingUser = await User.findOne({ email: user.email });

        if (!existingUser) {
          // Create a new user directly using MongoDB create operation
          const newUser = await User.create({
            name: user.name || '',
            email: user.email,
            image: user.image || '',
            city: '', // Add default empty string for city
            phone: '', // Add default empty string for phone
          });

          console.log('New user created:', newUser);
        }

        return true;

      } catch (error) {
        console.error("Error during sign in:", error);
        return false;
      }
    },
    async session({ session }) {
      // You can add custom session logic here if needed
      return session;
    },
  },
  // Add any additional configuration options here
  // For example:
  // pages: {
  //   signIn: '/auth/signin',
  // },
});


export { handler as GET, handler as POST };