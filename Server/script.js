import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

async function main() {
    const user = await prisma.user.deleteMany();
    console.log(user)
    console.log(await prisma.user.findMany())

}

main()
    .catch(e => {
        console.error(e.message)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })