import { test, expect, request, APIRequestContext } from "@playwright/test";
import { faker } from '@faker-js/faker/locale/en';


test("TC-1 Create new user", { tag: ['@api'] }, async ({ request }) => {
    const username = faker.string.alphanumeric(6);
    const password = faker.internet.password();
    const email = username + "@gm.com";

    const response = await request.post(
        `${process.env.BASE_API_URL}/api/users`,
        {
            data: {
                user: { email: email, password: password, username: username },
            },
        }
    );

    const responseBody = await response.json();
    const token = responseBody.user.token;
    expect(token).toBeTruthy();
});

test('TC-2 Login as existing user', { tag: ['@api'] }, async ({ request }) => {
    const token = await loginAndGetToken(request);
    expect(token).toBeTruthy();
});

test('TC-3 Create Article', { tag: ['@api'] }, async ({ request }) => {
    const token = await loginAndGetToken(request);
    const slug = await createArticle(request, token);
    expect(slug).toBeTruthy();
});

test('TC-4 Edit Article', { tag: ['@api'] }, async ({ request }) => {
    const token = await loginAndGetToken(request);
    const newArticleTitle = faker.lorem.sentence();
    const newArticleDescription = faker.lorem.paragraph();
    const slug = await createArticle(request, token);

    const response = await request.put(`${process.env.BASE_API_URL}/api/articles/${slug}`, {
        data: {
            "article": {
                "slug": slug,
                "title": newArticleTitle,
                "description": "",
                "body": newArticleDescription,
                "createdAt": "2025-12-15T13:16:04.829Z",
                "updatedAt": "2025-12-15T13:16:04.829Z",
                "tagList": [],
                "favorited": false,
                "favoritesCount": 0,
                "author": {
                    "username": "valera",
                    "image": "https://static.productionready.io/images/smiley-cyrus.jpg",
                    "following": false
                }
            }
        },
        headers: { Authorization: `Bearer ${token}` }
    });

    expect(response.ok()).toBeTruthy();
    const body = await response.json();
    expect(body.article.title).toBe(newArticleTitle);
    expect(body.article.body).toBe(newArticleDescription);

});

test('TC-5 Delete Article', { tag: ['@api'] }, async ({ request }) => {
    const token = await loginAndGetToken(request);
    const slug = await createArticle(request, token);

    const response = await request.delete(`${process.env.BASE_API_URL}/api/articles/${slug}`, {
        headers: { Authorization: `Bearer ${token}` }
    });

    expect(response.ok()).toBeTruthy();
});


async function loginAndGetToken(request: APIRequestContext) {
    const response = await request.post(`${process.env.BASE_API_URL}/api/users/login`, {
        data: {
            user: {
                email: 'valera@gm.com',
                password: '123456',
            },
        },
    });
    expect(response.ok()).toBeTruthy();
    const responseBody = await response.json();
    const token = responseBody.user.token;
    return token;
}

async function createArticle(request: APIRequestContext, token: string) {
    const articleTitle = faker.lorem.sentence();
    const articleDescription = faker.lorem.paragraph();

    const response = await request.post(`${process.env.BASE_API_URL}/api/articles`, {
        data: {
            article: { author: {}, title: articleTitle, description: "", body: articleDescription, tagList: [] }
        },
        headers: { Authorization: `Bearer ${token}` }
    });

    expect(response.ok()).toBeTruthy();
    const body = await response.json();
    expect(body.article.title).toBe(articleTitle);
    expect(body.article.body).toBe(articleDescription);

    return body.article.slug;
}