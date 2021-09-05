exports.addOne = async (user) => {
    const { firstName, lastName, email, password } = user;
    return await db.execute(
      `INSERT INTO users (firstName, latstName, emailId, password) VALUES(?,?,?,?);`,
      [firstName, lastName, email, password]
    );
  };
  