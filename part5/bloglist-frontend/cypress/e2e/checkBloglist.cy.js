describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      username: 'mluukkai',
      password: 'salainen',
      name: 'Matti Luukkainen',
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    const user2 = {
      username: 'mluukkai2',
      password: 'salainen2',
      name: 'Matti Luukkainen2',
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user2)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function () {
    cy.contains('Login now').click()
    cy.contains('Log in to application')
  })

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.contains('Login now').click()
      cy.get('#username').type('mluukkai')
      cy.get('#password').type('salainen')
      cy.get('#login-button').click()

      cy.contains('Matti Luukkainen logged-in')
    })

    it('fails with wrong credentials', function () {
      cy.contains('Login now').click()
      cy.get('#username').type('mluukkai')
      cy.get('#password').type('salai')
      cy.get('#login-button').click()

      cy.get('.error')
        .should('contain', 'Wrong username or password')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
        .and('have.css', 'border-style', 'solid')
    })
  })

  describe('When logged in', function () {
    beforeEach(function () {
      cy.login({ username: 'mluukkai', password: 'salainen' })
    })

    it('A blog can be created', function () {
      cy.contains('Create New Blog').click()
      cy.get('#title').type('title of blog')
      cy.get('#author').type('mluukkai')
      cy.get('#url').type('http://abc.com')
      cy.get('#create-button').click()
      cy.contains('title of blog mluukkai')
    })
  })

  describe('When logged in and has 3 blog', function () {
    beforeEach(function () {
      cy.login({ username: 'mluukkai', password: 'salainen' })
      cy.createBlog({
        title: 'title of blog 0',
        author: 'mluukkai',
        url: 'http://abc.com',
        likes: 15,
      })
      cy.createBlog({
        title: 'title of blogh 1',
        author: 'mluukkai1',
        url: 'http://abc1.com',
      })
      cy.createBlog({
        title: 'title of blogg 2',
        author: 'mluukkai2',
        url: 'http://abc2.com',
        likes: 10,
      })
      cy.contains('title of blogh 1 mluukkai1').parent().find('button').click()
      cy.contains('title of blog 0 mluukkai').parent().find('button').click()
    })

    it('Users can like a blog', function () {
      cy.contains('title of blogh 1')
        .parent()
        .find('button')
        .then((buttons) => {
          cy.wrap(buttons[1]).click()
        })

      cy.contains('likes 1')
    })

    it('Blog can be delete by created user', function () {
      cy.contains('title of blogh 1')
        .parent()
        .find('button')
        .then((buttons) => {
          cy.wrap(buttons[2]).click()
        })
      cy.contains('deleting a blog successful')
    })
    it('Blog can not be delete by other user', function () {
      cy.contains('logout').click()
      cy.login({ username: 'mluukkai2', password: 'salainen2' })
      cy.contains('title of blogh 1 mluukkai1').parent().find('button').click()
      cy.contains('title of blogh 1')
        .parent()
        .find('button')
        .then((buttons) => {
          cy.wrap(buttons[2]).click()
        })

      cy.contains('deleting a blog failed')
    })

    it('Blogs are ordered according to likes', function () {
      cy.get('li').eq(0).should('contain', 'title of blog 0')
      cy.get('li').eq(1).should('contain', 'title of blogg 2')
      cy.get('li').eq(2).should('contain', 'title of blogh 1')
    })
  })
})
