class PIM {
  elements = {
    MainMenuItems: () => cy.get(".oxd-sidepanel-body"),
    employeeName: () => cy.get(".orangehrm-edit-employee-name > .oxd-text"),
    loader: () => cy.get(".oxd-loading-spinner"),
    //info Employee Details
    calender: () => cy.get(".oxd-calendar-wrapper"),
    licenseExpiryDate: () =>
      cy.get(
        ":nth-child(2) > .oxd-input-group > :nth-child(2) > .oxd-date-wrapper > .oxd-date-input > .oxd-icon"
      ),
    nationality: () =>
      cy.get(
        ":nth-child(5) > :nth-child(1) > :nth-child(1) > .oxd-input-group > :nth-child(2) > .oxd-select-wrapper > .oxd-select-text > .oxd-select-text-input"
      ),
    maritalStatus: () =>
      cy.get(
        ":nth-child(2) > .oxd-input-group > :nth-child(2) > .oxd-select-wrapper > .oxd-select-text > .oxd-select-text-input"
      ),
    dateOfBirth: () =>
      cy.get(
        ":nth-child(1) > .oxd-input-group > :nth-child(2) > .oxd-date-wrapper > .oxd-date-input > .oxd-icon"
      ),
    femal: () =>
      cy.get(
        ":nth-child(2) > :nth-child(2) > .oxd-radio-wrapper > label > .oxd-radio-input"
      ),
    male: () =>
      cy.get(
        ":nth-child(1) > :nth-child(2) > .oxd-radio-wrapper > label > .oxd-radio-input"
      ),
    save: () =>
      cy.get(":nth-child(1) > .oxd-form > .oxd-form-actions > .oxd-button"),

    dropDown: () => cy.get(".oxd-select-dropdown"),

    // job Tab
    jobTab: () => cy.get(":nth-child(6) > .orangehrm-tabs-item"),
    //Employee info job
    empJobTitle: () =>
      cy.get(
        ":nth-child(2) > .oxd-input-group > :nth-child(2) > .oxd-select-wrapper > .oxd-select-text > .oxd-select-text--after > .oxd-icon"
      ),
    empSubunit: () =>
      cy.get(
        ":nth-child(5) > .oxd-input-group > :nth-child(2) > .oxd-select-wrapper > .oxd-select-text > .oxd-select-text--after > .oxd-icon"
      ),
    empStatus: () =>
      cy.get(
        ":nth-child(7) > .oxd-input-group > :nth-child(2) > .oxd-select-wrapper > .oxd-select-text > .oxd-select-text--after > .oxd-icon"
      ),

    // report Tab to add supervisor
    reportTab: () => cy.get(":nth-child(9) > .orangehrm-tabs-item"),

    //Supervisors Add button
    supervisor: () =>
      cy.get(
        ":nth-child(2) > :nth-child(1) > .orangehrm-action-header > .oxd-button"
      ),
    supervisorInput: () => cy.get(".oxd-autocomplete-text-input > input"),
    supervisorName: () => cy.get(".oxd-autocomplete-option"),
    reportOption: () => cy.get(".oxd-select-text--after > .oxd-icon"),
    direct: () => cy.get(".oxd-select-dropdown > :nth-child(2)"),
    indirect: () => cy.get(".oxd-select-dropdown > :nth-child(3)"),
    //Supervisors Save button
    saveSuper: () => cy.get(".oxd-button--secondary"),
  };
  successAddEmployee(empNum: number, firstName: any, lastName: any) {
<<<<<<< HEAD
    cy.visit(`/web/index.php/pim/viewPersonalDetails/empNumber/${empNum}`);
    this.elements.employeeName().should("contain", firstName + " " + lastName);
=======
    cy.visit(
      `/web/index.php/pim/viewPersonalDetails/empNumber/${empNum}`
    );
    this.elements.success().should("contain", firstName + " " + lastName);
>>>>>>> 1c64cad589453635d8059e9735ee4006b7b4ebe7
  }
  addEmpDetailsInfo(user: any, supervisor: any) {
    //select license Expiry Date
    this.elements.licenseExpiryDate().click({
      force: true,
    });
    this.elements.calender().contains(user.licenseExpiryDate).click({
      force: true,
    });

    //select Nationality
    this.elements.nationality().click({ force: true });
    this.elements.dropDown().contains(user.nationality).click({ force: true });

    //select MaritalStatus
    this.elements.maritalStatus().click({
      force: true,
    });
    this.elements.dropDown().contains(user.maritalStatus).click({
      force: true,
    });
    //select dateOfBirth
    this.elements.dateOfBirth().click({ force: true });
    this.elements.calender().contains(user.dateOfBirth).click({ force: true });
    //select Gender
    switch (user.gender) {
      case "Femal":
        this.elements.femal().click({
          force: true,
        });
        break;
      case "male":
        this.elements.male().click({
          force: true,
        });
    }

    //save Employee details info
    this.elements.save().click({
      force: true,
    });
    // open job tab
    this.elements.jobTab().click({
      force: true,
    });

    this.elements
      .loader()
      .should("exist")
      .then(() => {
        // select Administration
        this.elements.empJobTitle().click({
          force: true,
        });
        this.elements.dropDown().contains(user.jobTitle).click({
          force: true,
        });
        //selsct Content Specialist
        this.elements.empSubunit().click({
          force: true,
        });
        this.elements.dropDown().contains(user.subUnit).click({
          force: true,
        });
        // select Freelance
        this.elements.empStatus().click({
          force: true,
        });
        this.elements.dropDown().contains(user.empStatus).click({
          force: true,
        });

        this.elements.save().click({
          force: true,
        });
        //open report tab  to select supervisor
        this.elements.reportTab().click({
          force: true,
        });
      });

    // select supervisor was added  in (beforeEach) block
    //Supervisor Name
    this.elements.supervisor().click({
      force: true,
    });
    this.elements.supervisorInput().type(supervisor.firstName + " ");
    this.elements.supervisorName().contains(supervisor.firstName).click({
      force: true,
    });
    //Report option
    this.elements.reportOption().click({
      force: true,
    });
    switch (supervisor.reportOption) {
      case "Direct":
        this.elements.direct().click({
          force: true,
        });
      case "Indirect":
        this.elements.indirect().click({
          force: true,
        });
    }

    // save supervisor
    this.elements.saveSuper().click({
      force: true,
    });
    //open PIM tab
    this.elements.MainMenuItems().contains("PIM").click({
      force: true,
    });
<<<<<<< HEAD
=======
  }
    // search by Id
    checkSearchById(user: any, supervisor: any) {
    this.elements.id().type(user.id);
    this.elements.searchBtn().click({
      force: true,
    });
    this.elements.search
      .first_middle_name()
      .should("contain", user.firstName + " " + user.middleName);
    this.elements.search.last_name().should("contain", user.lastName);
    this.elements.search.job_title().should("contain", user.jobTitle);
    this.elements.search.emp_status().should("contain", user.empStatus);
    this.elements.search.sub_unit().should("contain", user.subUnit);
    this.elements.search.supervisor().should("contain", supervisor.firstName);
>>>>>>> 1c64cad589453635d8059e9735ee4006b7b4ebe7
  }
}
export default PIM;
