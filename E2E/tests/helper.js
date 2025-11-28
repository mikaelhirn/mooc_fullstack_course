const loginWith = async (page, username, password) => {
        await page.getByLabel('Name').fill('Masa')
        await page.getByLabel('Password').fill('masanpassu')
        await page.getByRole('button', { name: 'Login' }).click()
}

export { loginWith }
