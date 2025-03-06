import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
export async function getCategories() {
    const categories = await prisma.categories.findMany();
    return categories;
}
export async function getCategory(slug) {
    return await prisma.categories.findUnique({
        where: {
            slug,
        },
    });
}
export async function createCategory(data) {
    return await prisma.categories.create({
        data: {
            title: data.title,
            slug: data.title.toLowerCase().replace(" ", "-"),
        },
    });
}
export async function updateCategory(slug, data) {
    return await prisma.categories.update({
        where: {
            slug,
        },
        data: {
            title: data.title,
            slug: data.title.toLowerCase().replace(" ", "-"),
        },
    });
}
export async function deleteCategory(slug) {
    return await prisma.categories.delete({
        where: {
            slug,
        },
    });
}
export async function getQuestions() {
    return await prisma.questions.findMany();
}
export async function getQuestionsByCategory(slug) {
    const categoryResult = await prisma.categories.findUnique({
        where: {
            slug,
        },
    });
    return await prisma.questions.findMany({
        where: {
            categoryId: categoryResult.id,
        },
    });
}
export async function createQuestion(data) {
    return await prisma.questions.create({
        data: {
            question: data.question,
            categoryId: data.categoryId,
            correctAnswer: data.correctAnswer,
            answers: data.answers,
        },
    });
}
export async function updateQuestion(id, data) {
    return await prisma.questions.update({
        where: {
            id,
        },
        data: {
            question: data.question,
            categoryId: data.categoryId,
            correctAnswer: data.correctAnswer,
            answers: data.answers,
        },
    });
}
