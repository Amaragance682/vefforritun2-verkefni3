import { PrismaClient } from "@prisma/client";
import { Category, Question, type Slug } from "./validators.js";

const prisma = new PrismaClient();

export async function getCategories() {
  const categories = await prisma.categories.findMany();
  return categories;
}

export async function getCategory(slug: Slug) {
  return await prisma.categories.findUnique({
    where: {
      slug,
    },
  });
}

export async function createCategory(data: Category) {
  return await prisma.categories.create({
    data: {
      title: data.title,
      slug: data.title.toLowerCase().replace(" ", "-"),
    },
  });
}

export async function updateCategory(slug: Slug, data: Category) {
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

export async function deleteCategory(slug: Slug) {
  return await prisma.categories.delete({
    where: {
      slug,
    },
  });
}

export async function getQuestions() {
  return await prisma.questions.findMany();
}

export async function getQuestionsByCategory(slug: Slug) {
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

export async function createQuestion(data: Question) {
  return await prisma.questions.create({
    data: {
      question: data.question,
      categoryId: data.categoryId,
      correctAnswer: data.correctAnswer,
      answers: data.answers,
    },
  });
}

export async function updateQuestion(id: number, data: Question) {
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
