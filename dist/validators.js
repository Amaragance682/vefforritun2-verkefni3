import { z } from "zod";
import xss from "xss";
export function sanitizeJSON(input) {
    if (typeof input === "string") {
        return xss(input);
    }
    if (Array.isArray(input)) {
        return input.map(sanitizeJSON);
    }
    if (typeof input === "object" && input !== null) {
        const sanitizedObject = {};
        for (const [key, value] of Object.entries(input)) {
            sanitizedObject[key] = sanitizeJSON(value);
        }
        return sanitizedObject;
    }
    return input;
}
const SlugSchema = z
    .string()
    .min(1, "slug must be at least one letter")
    .max(1024, "slug cannot be more than 1024 letters");
const CategorySchema = z.object({
    title: z
        .string()
        .min(1, "category cannot have an empty name")
        .max(1024, "category cant have a name longer than 1024 characters"),
});
const QuestionSchema = z.object({
    question: z
        .string()
        .min(1, "question must be at least one character")
        .max(2048, "question cannot be longer than 2048 characters"),
    categoryId: z.number(),
    correctAnswer: z
        .number()
        .min(1, "correct answer cant be outside the range 1-4")
        .max(4, "correct answer cant be outside the range 1-4"),
    answers: z
        .array(z
        .string()
        .min(1, "answer cannot be empty")
        .max(2048, "answer cant be longer than 2048 characters"))
        .length(4, "answers must be four"),
});
export function validateSlug(slug) {
    return SlugSchema.safeParse(slug);
}
export function validateCategory(category) {
    return CategorySchema.safeParse(category);
}
export function validateQuestion(question) {
    return QuestionSchema.safeParse(question);
}
