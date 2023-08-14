/// <reference types="cypress" />
import Home from "../../pages/Home"

//constructor for Home Page from /pages
const home = new Home()

describe('simple to-do app test suite', () => {
    const random = '1' + Math.random().toString().substr(2, 9)
    beforeEach(() => {
        cy.restoreLocalStorageCache();
        cy.visit('/')
    })
    afterEach(() => {
        cy.saveLocalStorageCache();
    })
    //create a test suite that can run 3 times and create 3 tasks
    Cypress._.times(3, () => {
        it('create task with valid name and date', () => {
            //enter task name
            home.taskInput('task' + random)
            //enter date
            home.dateInput("2023-03-01")
            home.getAddTaskButton().click()
        })
    })


    it('can check off an item as Done', () => {
        //click on Done on the first item
        home.getDoneButton(1).click()
        //verify the text has Not done after click on Done
        cy.get(':nth-child(1) > .unmark-as-done')
            .should('have.text', 'Not done')

    })

    it('can check  Delete an item from the task list', () => {
        //click on delete button on the first item
        home.getDeleteButton(1).click()
        //Validation the list items to be 2 after delete one item
        cy.get('ul')
            .find('li')
            .should(($li) => {
                expect($li).to.have.length(2)
            })

    })
    it('can check  Mark all Done', () => {
        //click on Mark all done button
        home.getMarkAllDoneButton().click()
        //Validation the list items to be 2 with Not done UI
        cy.get('ul')
            .find('button.unmark-as-done')
            .should(($li) => {
                expect($li).to.have.length(2)
            })

    })

    it('can check  Mark all not Done', () => {

        home.getMarkAllNotDoneButton().click()
        //Validation the list items to be 1 after delete one item
        cy.get('ul')
            .find('button.mark-done-button')
            .should(($li) => {
                expect($li).to.have.length(2)
            })

    })

    it('can check Delete all task ', () => {

        home.getDeleteAllButton().click()
        //Validation the list items to be 1 after delete one item
        cy.get('ul')
            .find('li')
            .should(($li) => {
                expect($li).to.have.length(0)
            })

    })
})
