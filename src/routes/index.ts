import { FastifyReply, FastifyRequest } from "fastify";

export default async function routes(fastify: any) {

    // on / route, return a message
    fastify.get('/', async () => {
        return { backend: "get from api" }
    })

    // get all books
    fastify.get('/books', async (request: FastifyRequest, reply: FastifyReply) => {
        const books = await fastify.prisma.book.findMany()
        return reply.send({ data: books })
    })

    // get one book
    fastify.get('/books/:id', async (request: FastifyRequest, reply: FastifyReply) => {
        const { id }: any = request.params;
        const book = await fastify.prisma.book.findUnique({
            where: {
                id: Number(id)
            }
        })
        return reply.send({ data: book })
    })

    // create book
    fastify.post('/books', async (request: FastifyRequest, reply: FastifyReply) => {
        const { title, authorId, published, pageCount }: any = request.body;

        try {
            // Buat buku baru menggunakan Prisma
            const newBook = await fastify.prisma.book.create({
                data: {
                    title,
                    authorId,
                    published,
                    pageCount,
                },
            });

            return reply.send({ data: newBook })
        } catch (error) {
            return reply.send({ error })
        }
    })

    // delete book
    fastify.delete('/books/:id', async (request: FastifyRequest, reply: FastifyReply) => {
        const { id }: any = request.params;
        const book = await fastify.prisma.book.delete({
            where: {
                id: Number(id)
            }
        })
        return reply.send({ data: book })
    });

    // get all author
    fastify.get('/authors', async (request: FastifyRequest, reply: FastifyReply) => {
        const authors = await fastify.prisma.author.findMany()
        return reply.send({ data: authors })
    });

    // get one author
    fastify.get('/authors/:id', async (request: FastifyRequest, reply: FastifyReply) => {
        const { id }: any = request.params;
        const author = await fastify.prisma.author.findUnique({
            where: {
                id: Number(id)
            }
        })
        return reply.send({ data: author })
    })

    // create author
    fastify.post('/authors', async (request: FastifyRequest, reply: FastifyReply) => {
        const { name }: any = request.body;
        try {
            // Buat buku baru menggunakan Prisma
            const newAuthor = await fastify.prisma.author.create({
                data: {
                    name
                },
            });
            return reply.send({ data: newAuthor })
        } catch (error) {
            return reply.send({ error })
        }
    })

    // delete author
    fastify.delete('/authors/:id', async (request: FastifyRequest, reply: FastifyReply) => {
        const { id }: any = request.params;
        const author = await fastify.prisma.author.delete({
            where: {
                id: Number(id)
            }
        })
        return reply.send({ data: author })
    });


    // health check
    fastify.get('/healthcheck', async () => {
        return { status: "ok", message: 'Application is healthy' }
    })
}