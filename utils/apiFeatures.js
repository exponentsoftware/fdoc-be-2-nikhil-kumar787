class APIFeatures {
  constructor(query, queryStr) {
    this.query = query;
    this.queryStr = queryStr;
  }

  search() {
    const name = this.queryStr.name
      ? {
          title: {
            $regex: this.queryStr.name,
            $options: "i",
          },
        }
      : {};

    this.query = this.query.find({ ...name });
    return this;
  }

  // filter() {
  //   const queryCopy = { ...this.queryStr };

  //   //Remove fileds from query
  //   const removeFields = ["location", "page"];
  //   removeFields.forEach((el) => delete queryCopy[el]);

  //   this.query = this.query.find(queryCopy);
  //   return this;
  // }

  // pagination(resPerPage) {
  //   const currentPage = Number(this.queryStr.page) || 1;
  //   const skip = resPerPage * (currentPage - 1);

  //   this.query = this.query.limit(resPerPage).skip(skip);
  //   return this;
  // }
}

export default APIFeatures;
