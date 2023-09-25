import LoginPage from "../../support/PageObjectModel/login";
import PIM from "../../support/PageObjectModel/PIM";
import EmpTable from "../../support/PageObjectModel/empTable";
const loginObj: LoginPage = new LoginPage();
const pimObj: PIM = new PIM();
const empTableObj = new EmpTable();

describe("Create new employee by API and fill that employee details info by UI  ", () => {
  beforeEach(function () {
    cy.intercept(
      "https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index"
    ).as("LoginPage");
    cy.visit("/");
    cy.fixture("employeeInfo").as("EmpInfo");
    loginObj.login("Admin", "admin123");

    //Add new Supervisor by Api to assign it to the empolyee info add in next step
    cy.get("@EmpInfo").then((EmpInfo: any) => {
      cy.request({
        method: "POST",
        url: "/web/index.php/api/v2/pim/employees",
        body: {
          firstName: EmpInfo.supervisor.firstName,
          middleName: EmpInfo.supervisor.middleName,
          lastName: EmpInfo.supervisor.lastName,
          empPicture: null,
          employeeId: EmpInfo.supervisor.id,
        },
      }).then((response) => {
        expect(response).property("status").to.equal(200);
      });
    });

    //Add new Employee by API
    cy.get("@EmpInfo").then((EmpInfo: any) => {
      cy.request({
        method: "POST",
        url: "/web/index.php/api/v2/pim/employees",
        body: {
          firstName: EmpInfo.user.firstName,
          middleName: EmpInfo.user.middleName,
          lastName: EmpInfo.user.lastName,
          empPicture: null,
          employeeId: EmpInfo.user.id,
        },
      }).then((response) => {
        expect(response).property("status").to.equal(200);
        const empNumber = response.body.data.empNumber;
        pimObj.successAddEmployee(
          empNumber,
          EmpInfo.user.firstName,
          EmpInfo.user.lastName
        );
      });
    });
  });

  it("Add Employee Info by UI ", () => {
    cy.get("@EmpInfo").then((EmpInfo: any) => {
      pimObj.addEmpDetailsInfo(EmpInfo.user, EmpInfo.supervisor);
      empTableObj.checkSearchById(EmpInfo.user, EmpInfo.supervisor);
    });
  });
});
