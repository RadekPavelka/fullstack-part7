describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'John Doe',
      username: 'jdoe',
      password: 'pass123',
    }
    const otherUser = {
      name: 'John Foe',
      username: 'jfoe',
      password: 'pass123',
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.request('POST', 'http://localhost:3003/api/users/', otherUser)

    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function () {
    cy.contains('Log in to application')
  })

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.get('#username').type('jdoe')
      cy.get('#password').type('pass123')
      cy.get('#login-button').click()

      cy.contains('jdoe logged in')
    })
    it('fails with wrong credentials', function () {
      cy.get('#username').type('jdoe')
      cy.get('#password').type('wrongPass')
      cy.get('#login-button').click()

      cy.contains('Wrong credentials')

      cy.get('html').should('not.contain', 'jdoe logged in')
    })
  })

  describe('When logged in', function () {
    beforeEach(function () {
      cy.login({ username: 'jdoe', password: 'pass123' })
    })

    it('A blog can be created', function () {
      cy.contains('create new blog').click()
      cy.get('#title-input').type('A new blog')
      cy.get('#author-input').type('Thomas Blogger')
      cy.get('#url-input').type('newblog.com')
      cy.get('#create-button').click()

      cy.contains('A new blog Thomas Blogger')
    })
    describe('and some blogs exist', function () {
      beforeEach(function () {
        cy.createBlog({
          title: 'First blog',
          author: 'Peter File',
          url: 'first.com',
        })
        cy.createBlog({
          title: 'Second blog',
          author: 'Tom Jones',
          url: 'second.com',
        })
        cy.createBlog({
          title: 'Third blog',
          author: 'Rick Roll',
          url: 'third.clom',
        })
      })
      it('we can give them a like', function () {
        cy.contains('First blog').find('.view-button').click()
        cy.get('.like-button').click()
        cy.contains('likes: 1')
      })
      it('they can be deleted by the user who created it', function () {
        cy.contains('First blog').find('.view-button').click()
        cy.get('.remove-button').click()
        cy.get('html').should('not.contain', 'First blog')
      })
      it('they cannot be deleted by other users', function () {
        //logout
        cy.get('#logout-button').click()
        //login as different user
        cy.login({ username: 'jfoe', password: 'pass123' })
        cy.contains('First blog').find('.view-button').click()
        cy.get('html').should('not.contain', '.remove-button')
      })
      it('they are ordered by number of likes', function () {
        //give first blog 3 likes
        cy.contains('First blog').find('.view-button').click()
        cy.contains('First blog').get('.like-button').click()
        cy.wait(500)
        cy.contains('First blog').get('.like-button').click()
        cy.wait(500)
        cy.contains('First blog').get('.like-button').click()
        cy.wait(500)
        cy.contains('likes: 3')
        //give second blog 5 likes
        cy.contains('Second blog').find('.view-button').click()
        cy.wait(500)
        cy.contains('Second blog').parent().find('.like-button').click()
        cy.wait(500)
        cy.contains('Second blog').parent().find('.like-button').click()
        cy.wait(500)
        cy.contains('Second blog').parent().find('.like-button').click()
        cy.wait(500)
        cy.contains('Second blog').parent().find('.like-button').click()
        cy.wait(500)
        cy.contains('likes: 4')
        //check the order
        cy.get('#root')
          .find('.blog')
          .then((blogs) => {
            cy.wrap(blogs[0]).contains('likes: 4')
            cy.wrap(blogs[1]).contains('likes: 3')
          })
      })
    })
  })
})
