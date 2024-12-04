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

  it("should successfully send a PATCH request", () => {
    const requestBody = {
      title: "Czas na biologie zad.1 str.16",
      content: "Hejka pomocy nie umiem macie",
      date: "2024-12-04T14:37:53.619Z",
      images: [
        {
          images: {
            create: {
              img: "Image in base64",
            },
          },
        },
      ],
      tags: [
        {
          where: {
            id: 1,
          },
          create: {
            tagsId: 1,
          },
        },
        {
          where: {
            id: 2,
          },
          create: {
            tagsId: 2,
          },
        },
      ],
      userId: 1,
    };

    cy.request({
      method: "PATCH",
      url: "http://localhost:3001/posts/24",
      body: requestBody,
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property("id");
      expect(response.body.title).to.eq(requestBody.title);
    });
  });
});
