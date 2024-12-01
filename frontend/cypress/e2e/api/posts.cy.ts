context("/posts tests", () => {
  it("gets full list of posts", () => {
    cy.request("GET", "http://localhost:3001/posts").then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).length.to.be.greaterThan(1);
    });
  });

  it("should successfully send a POST request", () => {
    const requestBody = {
      title: "test title",
      content: "test content",
      category: "test Category",
      date: "2024-11-30T12:26:21.748Z",
      images: [
        {
          images: {
            create: {
              img: "test Image in base64",
            },
          },
        },
      ],
      tags: [
        {
          tagsId: 1,
        },
        {
          tagsId: 2,
        },
      ],
      userId: 1,
    };

    cy.request({
      method: "POST",
      url: "http://localhost:3001/posts/post",
      body: requestBody,
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) => {
      expect(response.status).to.eq(201);
      expect(response.body).to.have.property("id");
      expect(response.body.title).to.eq(requestBody.title);
    });
  });
});
