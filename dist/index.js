import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { sanitizeJSON } from "./validators.js";
import { validateCategory, validateQuestion, validateSlug, } from "./validators.js";
import { createCategory, createQuestion, deleteCategory, getCategories, getCategory, getQuestions, getQuestionsByCategory, updateCategory, updateQuestion, } from "./api.js";
import process from "node:process";
const app = new Hono();
app.get("/categories", async (c) => {
    const categories = await getCategories();
    return c.json(categories, 200);
});
app.get("/categories/:slug", async (c) => {
    const slugToValidate = c.req.param("slug");
    const slug = validateSlug(sanitizeJSON(slugToValidate));
    if (!slug.success) {
        return c.json({
            error: "slug was invalid, try again",
            errors: slug.error.flatten(),
        }, 400);
    }
    const category = await getCategory(slug.data);
    if (!category) {
        return c.json({ error: "category was not found" }, 400);
    }
    return c.json(category, 200);
});
app.post("/category", async (c) => {
    let dataToValidate;
    try {
        dataToValidate = await c.req.json();
    }
    catch {
        return c.json({ error: "json was invalid" }, 400);
    }
    const data = validateCategory(sanitizeJSON(dataToValidate));
    if (!data.success) {
        return c.json({
            error: "data was invalid, try again",
            errors: data.error.flatten(),
        }, 400);
    }
    const categoryResult = await createCategory(data.data);
    return c.json(categoryResult, 201);
});
app.patch("/category/:slug", async (c) => {
    const slugToValidate = c.req.param("slug");
    let dataToValidate;
    try {
        dataToValidate = await c.req.json();
    }
    catch {
        return c.json({ error: "json was invalid" }, 400);
    }
    const slug = validateSlug(sanitizeJSON(slugToValidate));
    if (!slug.success) {
        return c.json({
            error: "slug was invalid, try again",
            errors: slug.error.flatten(),
        }, 400);
    }
    const data = validateCategory(sanitizeJSON(dataToValidate));
    const categoryResult = await getCategory(slug.data);
    if (!categoryResult) {
        return c.json({ error: "category was not found" }, 400);
    }
    const updateResult = await updateCategory(slug.data, data.data);
    return c.json(updateResult, 200);
});
app.delete("/category/:slug", async (c) => {
    const slugToValidate = c.req.param("slug");
    const slug = validateSlug(sanitizeJSON(slugToValidate));
    if (!slug.success) {
        return c.json({
            error: "slug was invalid, try again",
            errors: slug.error.flatten(),
        }, 400);
    }
    const categoryResult = await getCategory(slug.data);
    if (!categoryResult) {
        return c.json({ error: "category was not found" }, 400);
    }
    await deleteCategory(slug.data);
    return c.body(null, 204);
});
app.get("/questions", async (c) => {
    const questions = await getQuestions();
    return c.json(questions, 200);
});
app.get("/category/:slug/questions", async (c) => {
    const slugToValidate = c.req.param("slug");
    const slug = validateSlug(sanitizeJSON(slugToValidate));
    if (!slug.success) {
        return c.json({
            error: "slug was invalid, try again",
            errors: slug.error.flatten(),
        }, 400);
    }
    const categoryResult = await getCategory(slug.data);
    if (!categoryResult) {
        return c.json({ error: "category was not found" }, 400);
    }
    const questionsResult = await getQuestionsByCategory(slug.data);
    return c.json(questionsResult, 200);
});
app.post("/questions", async (c) => {
    let dataToValidate;
    try {
        dataToValidate = await c.req.json();
    }
    catch {
        return c.json({ error: "json was invalid" }, 400);
    }
    const data = validateQuestion(sanitizeJSON(dataToValidate));
    if (!data.success) {
        return c.json({
            error: "data was invalid, try again",
            errors: data.error.flatten(),
        }, 400);
    }
    const questionResult = await createQuestion(data.data);
    if (!questionResult) {
        return c.json({ error: "category not found" }, 404);
    }
    return c.json(questionResult, 201);
});
app.patch("/questions/:id", async (c) => {
    const id = Number(c.req.param("id"));
    let dataToValidate;
    try {
        dataToValidate = await c.req.json();
    }
    catch {
        return c.json({ error: "json was invalid" }, 400);
    }
    const data = validateQuestion(sanitizeJSON(dataToValidate));
    if (!data.success) {
        return c.json({
            error: "data was invalid, try again",
            errors: data.error.flatten(),
        }, 400);
    }
    const updateResult = await updateQuestion(id, data.data);
    if (!updateResult) {
        return c.json({ error: "question not found, try again" }, 404);
    }
    return c.json(updateResult, 200);
});
const PORT = Number(process.env.PORT) || 3000;
const HOST = process.env.NODE_ENV === "production" ? "0.0.0.0" : "localhost";
serve({
    fetch: app.fetch,
    port: PORT,
    hostname: HOST,
}, (info) => {
    console.log(`Server is running on http://localhost:${info.port}`);
});
