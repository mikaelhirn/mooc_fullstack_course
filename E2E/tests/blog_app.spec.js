const { test, expect, describe, beforeEach } = require('@playwright/test')
const { loginWith } = require('./helper')
describe('Blog test', () => {
    beforeEach(async ({ page, request }) => {
        await request.post('http://localhost:3003/api/testing/reset')
        await request.post('http://localhost:3003/api/users', {
            data: {
                author: 'Masa',
                name: 'Matti Meikalainen',
                password: 'masanpassu'
            }
        })

        await page.goto('http://localhost:5173')
    })

    test('front page can be opened', async ({ page }) => {

        const locator = page.getByText('blogs')
        await expect(locator).toBeVisible()
        await expect(page.getByText('Login to view blogs')).toBeVisible()
    })
    
    test.only('user can log in', async ({ page }) => {
        await loginWith(page, 'Masa', 'masanpassu')
        await expect(page.getByText('masa is logged in.')).toBeVisible()
    })

    describe('when logged in', () => {

        beforeEach(async ({ page }) => {
            await loginWith(page, 'Masa', 'masanpassu')
        })

        test('a new blog entry can be created', async ({ page }) => {
            await page.getByRole('button', { name: 'Insert blog' }).click()
            await page.getByLabel('title').fill('Playwright Testi 2')
            await page.getByLabel('author').fill('Playwright2')
            await page.getByLabel('url').fill('www.playwright.com')
            await page.getByRole('button', { name: 'Create' }).click()

            await expect(page.getByText('New blog added!')).toBeVisible()
        })
    })

})
