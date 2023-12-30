import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { signIn } from "next-auth/react";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "admin@mail.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/login`,
          {
            method: "POST",
            body: JSON.stringify({
              email: credentials?.email,
              password: credentials?.password,
            }),
            headers: { "Content-Type": "application/json" },
          }
        );

        const user = await res.json();
        console.log(user);

        if (user.error) throw user;

        return user;
      },
    }),
  ],
  // Con este metodo, le puedo pasar a la session el token con elementos personalizados
  callbacks: {
    async jwt({ token, user }) {
      return { ...token, ...user };
    },
    async session({ session, token }) {
      session.user = token as any;
      return session;
    },
  },

  // Este metodo deriva a la ruta login donde esta el formulario personalizado, cuando el usuario requiere realizar login
  pages: {
    signIn: "/login",
  },
});

export { handler as GET, handler as POST };
