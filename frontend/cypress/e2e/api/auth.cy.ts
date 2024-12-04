context("/auth tests", () => {
  it("should successfully logout", () => {
    const requestBody = {
      refreshToken: "28e38uqoiwhirq3.rewqhi318iou2qhrdasq3wo8;231",
    };

    cy.request({
      method: "DELETE",
      url: "http://localhost:3001/auth/logout",
      body: requestBody,
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) => {
      expect(response.status).to.eq(200);
    });
  });
});
