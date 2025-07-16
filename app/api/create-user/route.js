// app/api/create-user/route.ts
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { connectToDB } from "@utils/database";
import User from "@models/user";

export async function GET() {
  try {
    const { getUser } = getKindeServerSession();
    const kindeUser = await getUser();

    if (!kindeUser) {
      return new Response("Unauthorized", { status: 401 });
    }

    await connectToDB();

    const userExists = await User.findOne({ email: kindeUser.email });

    if (!userExists) {
      await User.create({
        email: kindeUser.email,
        username: kindeUser.given_name?.toLowerCase() || "user",
        image: kindeUser.picture,
      });
    }

    return new Response("User synced", { status: 200 });
  } catch (error) {
    return new Response("Error syncing user", { status: 500 });
  }
}
