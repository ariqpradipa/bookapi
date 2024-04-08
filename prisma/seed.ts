import { PrismaClient, Prisma } from '@prisma/client'

const prisma = new PrismaClient()

const bookData: Prisma.BookCreateInput[] = [
    {
        title: 'The Great Gatsby',
        author: {
            create: { name: 'F. Scott Fitzgerald' },
        },
        published: new Date('1925-04-10'),
        pageCount: 180,
    },
    {
        title: 'To Kill a Mockingbird',
        author: {
            create: { name: 'Harper Lee' },
        },
        published: new Date('1960-07-11'),
        pageCount: 281,
    },
    {
        title: 'Dune',
        author: {
            create: { name: 'Frank Herbert' },
        },
        published: new Date('1965-06-01'),
        pageCount: 412,
    },
]

async function main() {
    console.log(`Start seeding ...`)
    for (const b of bookData) {
        const book = await prisma.book.create({
            data: b,
        })
        console.log(`Created book with id: ${book.id}`)
    }
    console.log(`Seeding finished.`)
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })
