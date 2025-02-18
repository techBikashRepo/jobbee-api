class APIFIlter {
  constructor(query, queryStr) {
    this.query = query;
    this.queryStr = queryStr;
  }

  // Method to filter results based on query parameters
  filter() {
    const queryCopy = { ...this.queryStr };

    // Removing fields from the query that are not needed for filtering
    const removeFields = ["sort", "fields", "q", "limit", "page"];
    removeFields.forEach((el) => delete queryCopy[el]);

    // Advanced filtering using operators: lt, lte, gt, gte, in
    let queryStr = JSON.stringify(queryCopy);
    queryStr = queryStr.replace(
      /\b(gt|gte|lt|lte|in)\b/g,
      (match) => `$${match}`
    );

    this.query = this.query.find(JSON.parse(queryStr));
    return this;
  }

  // Method to sort results based on query parameters
  sort() {
    if (this.queryStr.sort) {
      const sortBy = this.queryStr.sort.split(",").join(" ");
      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort("-postingDate");
    }
    return this;
  }

  // Method to limit fields in the results based on query parameters
  limitFields() {
    if (this.queryStr.fields) {
      const fields = this.queryStr.fields.split(",").join(" ");
      this.query = this.query.select(fields);
    } else {
      this.query = this.query.select("-__v");
    }
    return this;
  }

  // Method to search results based on a text query
  searchByQuery() {
    if (this.queryStr.q) {
      const qu = this.queryStr.q.split("-").join(" ");
      this.query = this.query.find({ $text: { $search: `"${qu}"` } });
    }
    return this;
  }

  // Method to paginate results based on query parameters
  pagination() {
    const page = parseInt(this.queryStr.page, 10) || 1;
    const limit = parseInt(this.queryStr.limit, 10) || 10;
    const skipResult = (page - 1) * limit;

    this.query = this.query.skip(skipResult).limit(limit);

    return this;
  }
}

module.exports = APIFIlter;
