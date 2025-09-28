import { authOptions } from "@/lib/auth";
import NextAuth from "next-auth";

const handler = NextAuth(authOptions);
// const handler = NextAuth({
//   providers: [
//     CredentialsProvider({
//       name: "Credentials",
//       credentials: {
//         username: { label: "Username", type: "text" },
//         password: { label: "Password", type: "password" },
//       },
//       async authorize(credentials) {
//         if (!credentials) return null;
//
//         const user = db
//           .prepare("SELECT * FROM users WHERE username = ?")
//           .get(credentials.username) as User;
//
//         if (!user) return null;
//
//         const isValid = compareSync(credentials.password, user.hashed_password);
//
//         if (!isValid) return null;
//
//         return {
//           id: user.id,
//           name: user.username,
//         };
//       },
//     }),
//   ],
//   session: {
//     strategy: "jwt",
//   },
//   pages: {
//     signIn: "/login", // optional custom login page
//   },
// });
export { handler as GET, handler as POST };
