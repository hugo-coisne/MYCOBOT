describe("Mushroom Analysis Form", () => {
  beforeEach(() => {
    cy.visit("http://localhost:4200/");
  });

  it("should display the form and the Analyze button", () => {
    cy.contains("Mushroom Characteristics");
    cy.get("#mushroomFormId").should("exist");
    cy.get('button[type="submit"]').should("contain", "Analyze");
  });

  it("should fill the form and submit successfully", () => {
    cy.contains("Mushroom Characteristics").should("exist");
    cy.wait(1000);
    cy.get("form").should("exist");
    cy.get("#capShape").should("exist");
  });

  it("should fill the form and submit successfully", () => {
    cy.get("#capShape", { timeout: 10000 })
      .should("be.visible")
      .select("Convex");
    cy.get("#capSurface", { timeout: 10000 })
      .should("be.visible")
      .select("Smooth");
    cy.get("#capColor", { timeout: 10000 })
      .should("be.visible")
      .select("Brown");
    cy.get("#bruises", { timeout: 10000 })
      .should("be.visible")
      .select("Bruises");
    cy.get("#odor", { timeout: 10000 }).should("be.visible").select("None");
    cy.get("#gillAttachment", { timeout: 10000 })
      .should("be.visible")
      .select("Free");
    cy.get("#gillSpacing", { timeout: 10000 })
      .should("be.visible")
      .select("Close");
    cy.get("#gillSize", { timeout: 10000 })
      .should("be.visible")
      .select("Broad");
    cy.get("#gillColor", { timeout: 10000 })
      .should("be.visible")
      .select("Black");
    cy.get("#stalkShape", { timeout: 10000 })
      .should("be.visible")
      .select("Enlarging");
    cy.get("#stalkRoot", { timeout: 10000 })
      .should("be.visible")
      .select("Equal");
    cy.get("#stalkSurfaceAbove", { timeout: 10000 })
      .should("be.visible")
      .select("Smooth");
    cy.get("#stalkSurfaceBelow", { timeout: 10000 })
      .should("be.visible")
      .select("Smooth");
    cy.get("#stalkColorAbove", { timeout: 10000 })
      .should("be.visible")
      .select("White");
    cy.get("#stalkColorBelow", { timeout: 10000 })
      .should("be.visible")
      .select("White");
    cy.get("#veilColor", { timeout: 10000 })
      .should("be.visible")
      .select("White");
    cy.get("#ringNumber", { timeout: 10000 })
      .should("be.visible")
      .select("One");
    cy.get("#ringType", { timeout: 10000 })
      .should("be.visible")
      .select("Pendant");
    cy.get("#sporePrintColor", { timeout: 10000 })
      .should("be.visible")
      .select("Black");
    cy.get("#population", { timeout: 10000 })
      .should("be.visible")
      .select("Numerous");
    cy.get("#habitat", { timeout: 10000 }).should("be.visible").select("Woods");

    cy.get('button[type="submit"]').click();
    cy.contains("Prediction Result :").should("exist");
  });

  it("should allow the user to send feedback", () => {
      cy.get("#capShape", { timeout: 10000 })
      .should("be.visible")
      .select("Convex");
    cy.get("#capSurface", { timeout: 10000 })
      .should("be.visible")
      .select("Smooth");
    cy.get("#capColor", { timeout: 10000 })
      .should("be.visible")
      .select("Brown");
    cy.get("#bruises", { timeout: 10000 })
      .should("be.visible")
      .select("Bruises");
    cy.get("#odor", { timeout: 10000 }).should("be.visible").select("None");
    cy.get("#gillAttachment", { timeout: 10000 })
      .should("be.visible")
      .select("Free");
    cy.get("#gillSpacing", { timeout: 10000 })
      .should("be.visible")
      .select("Close");
    cy.get("#gillSize", { timeout: 10000 })
      .should("be.visible")
      .select("Broad");
    cy.get("#gillColor", { timeout: 10000 })
      .should("be.visible")
      .select("Black");
    cy.get("#stalkShape", { timeout: 10000 })
      .should("be.visible")
      .select("Enlarging");
    cy.get("#stalkRoot", { timeout: 10000 })
      .should("be.visible")
      .select("Equal");
    cy.get("#stalkSurfaceAbove", { timeout: 10000 })
      .should("be.visible")
      .select("Smooth");
    cy.get("#stalkSurfaceBelow", { timeout: 10000 })
      .should("be.visible")
      .select("Smooth");
    cy.get("#stalkColorAbove", { timeout: 10000 })
      .should("be.visible")
      .select("White");
    cy.get("#stalkColorBelow", { timeout: 10000 })
      .should("be.visible")
      .select("White");
    cy.get("#veilColor", { timeout: 10000 })
      .should("be.visible")
      .select("White");
    cy.get("#ringNumber", { timeout: 10000 })
      .should("be.visible")
      .select("One");
    cy.get("#ringType", { timeout: 10000 })
      .should("be.visible")
      .select("Pendant");
    cy.get("#sporePrintColor", { timeout: 10000 })
      .should("be.visible")
      .select("Black");
    cy.get("#population", { timeout: 10000 })
      .should("be.visible")
      .select("Numerous");
    cy.get("#habitat", { timeout: 10000 }).should("be.visible").select("Woods");

    cy.get('button[type="submit"]').click();
    cy.contains("Prediction Result :").should("exist");
    cy.get('textarea[name="userFeedback"]').type(
      "I think this prediction is wrong."
    );
    cy.get("button.btn-warning").should("not.be.disabled").click();
    cy.wait(1000);
    cy.contains("Feedback sent!").should("exist");
  });
});
