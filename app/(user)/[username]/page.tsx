import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { prisma } from "@/lib/prisma";
import axios from "axios";
import {
  User
} from "lucide-react";
import ProfileLink from "./components/Profile";
import { ModeToggle } from "@/components/app/Mode-Toggle";

export default async function UserPage(
  props: { params: Promise<{ username: string }> }
) {

  const username = (await props.params).username;

  const userInfo = await prisma.user.findUnique({
    where: { username },
    include: {
      links: {
        where: {
          isVisible: true
        }
      }
    }
  });

  const visitProfile = await axios.post(`${process.env.BASE_URL}/api/visit`, { userId: userInfo?.id });

  return (
    <main className="min-h-screen py-12 px-4">
      <ModeToggle />
      <div className="max-w-md mx-auto space-y-8">
        <div className="text-center space-y-4">
          <Avatar className="w-24 h-24 mx-auto border-4 border-primary">
            <AvatarImage src={userInfo?.image || ''} />
            <AvatarFallback><User /></AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-2xl font-bold">{userInfo?.name}</h1>
            <p className="text-muted-foreground"><span className="select-none">@</span>{userInfo?.username}</p>
          </div>
          <p className="text-foreground/80">
            {userInfo?.bio}
          </p>
        </div>
        <div className="space-y-4">
          {userInfo?.links.sort((a, b) => a.order - b.order).map((link) => (
            <ProfileLink key={link.id} link={link} profileVisitId={visitProfile.data.profileVisitId} />
          ))}
        </div>
      </div>
    </main>
  );
}