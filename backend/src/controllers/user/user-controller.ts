import { FastifyRequest, FastifyReply } from "fastify";
import crypt from "bcryptjs";;
import { prismaInstance } from "../../prisma";
import { User } from "../../models/user-model";

function validateUser(body: any) {
	const errors: string[] = [];
	if (!body.name || typeof body.name !== "string") errors.push("Nome é obrigatório.");
	if (!body.phone || typeof body.phone !== "string") errors.push("Telefone é obrigatório.");
	if (!body.cpf || typeof body.cpf !== "string") errors.push("CPF é obrigatório.");
	if (!body.birthDate || isNaN(Date.parse(body.birthDate))) errors.push("Data de nascimento inválida.");
	if (!body.gender || typeof body.gender !== "string") errors.push("Gênero é obrigatório.");
	if (!body.position || typeof body.position !== "string") errors.push("Cargo é obrigatório.");
	if (!body.email || typeof body.email !== "string") errors.push("Email é obrigatório.");
	if (!body.password || typeof body.password !== "string") errors.push("Senha é obrigatória.");
	return errors;
}

export async function getAllUsers(request: FastifyRequest, reply: FastifyReply): Promise<User[]> {
        try {
            const users = await prismaInstance.user.findMany();

            return reply.send(users);
        } catch (error) {
            return reply.status(500).send({ error: "Erro ao buscar usuários." });
        }
}

export async function getUserById(request: FastifyRequest, reply: FastifyReply): Promise<User> {
        const { id } = (request.params as { id: string });

        try {
            const user = await prismaInstance.user.findUnique({
                where: { id },
            });
            if (!user) {
                return reply.status(404).send({ error: "Usuário não encontrado." });
            }
            return reply.send(user);
        } catch (error) {
            return reply.status(500).send({ error: "Erro ao buscar usuário." });
        }
}

export async function authenticateUser(request: FastifyRequest, reply: FastifyReply): Promise<User | { error: string }> {
    const { email, password } = request.body as User;
    if (!email || !password) {
        return reply.status(400).send({ error: "Email e senha são obrigatórios." });
    }
    try {
        
        const user = await prismaInstance.user.findUnique({
            where: { email }
        });

        if (!user) {
            return reply.status(401).send({ error: "Erro ao autenticar usuário" });
        }

        const isPasswordValid: boolean = await crypt.compare(password, user.password);
        if (!isPasswordValid) return reply.status(401).send({ error: "Authentication failed, user not valid." });

        return reply.status(200).send(user);
    } catch (error) {
        return reply.status(500).send({ error: "Erro ao autenticar usuário." });
    }
}

export async function createUser(request: FastifyRequest, reply: FastifyReply): Promise<User> {
    const body = request.body as User;
    const errors = validateUser(body);
    if (errors.length > 0) {
        return reply.status(400).send({ errors });
    }
    try {
        const passwordHashed: string = await crypt.hash(body.password, 8);
        const user = await prismaInstance.user.create({
            data: {
                name: body.name,
                phone: body.phone,
                cpf: body.cpf,
                birthDate: new Date(body.birthDate),
                gender: body.gender,
                position: body.position,
                email: body.email,
                password: passwordHashed,
            },
        });

        return reply.status(201).send(user);
    } catch (error: any) {
        console.log(error)
        if (error.code === "P2002") {
            // Código de erro do prisma que indica violação de PK já cadastrada
            return reply.status(409).send({ error: "CPF já cadastrado." });
        }
        return reply.status(500).send({ error: error });
    }
}

export async function updateUser(request: FastifyRequest, reply: FastifyReply): Promise<User> {
    const { id } = (request.params as { id: string });
    const body = request.body as any;

    try {
        const user = await prismaInstance.user.update({
            where: { id },
            data: {
                name: body.name,
                phone: body.phone,
                cpf: body.cpf,
                birthDate: body.birthDate ? new Date(body.birthDate) : undefined,
                gender: body.gender,
                position: body.position,
                email: body.email,
                password: body.password,
            },
        });
        return reply.send(user);
    } catch (error: any) {
        if (error.code === "P2025") {
            return reply.status(404).send({ error: "Usuário não encontrado." });
        }
        if (error.code === "P2002") {
            return reply.status(409).send({ error: "CPF já cadastrado." });
        }
        return reply.status(500).send({ error: "Erro ao atualizar usuário." });
    }

}


