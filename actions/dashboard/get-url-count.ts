import {prisma} from "@/lib/prisma"

export const getLinksCount = async (userId: string) => {

    const linksCount = await prisma.link.count({
        where: {
            userId,
        },
    })

    return linksCount;

}