const mongoose = require("mongoose");
const validator = require("validator");
const slugigy = require("slugify");
const { default: slugify } = require("slugify");
const geoCoder = require("../utils/geocoder");

const jobSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please enter job title."],
    trim: true,
    maxlength: [100, "Job title cannot exceed 100 characters."],
  },
  slug: String,
  description: {
    type: String,
    required: [true, "Please enter job description."],
    maxlength: [1000, "Job description cannot exceed 1000 characters."],
  },
  email: {
    type: String,
    validate: [validator.isEmail, "Please enter a valid email address"],
  },
  address: {
    type: String,
    required: [true, "Please enter job address."],
  },
  location: {
    type: {
      type: String,
      enum: ["Point"],
    },
    coordinates: {
      type: [Number],
      index: "2dsphere",
    },
    formatedAddress: String,
    city: String,
    state: String,
    zipcode: String,
    country: String,
  },
  company: {
    type: String,
    required: [true, "Please enter company name."],
  },
  industry: {
    type: [String],
    required: [true, "Please enter industry."],
    enum: {
      values: [
        "Information Technology",
        "Banking",
        "Education/Training",
        "Healthcare",
        "Others",
      ],
      message: "Please select correct options for industry.",
    },
  },
  jobType: {
    type: String,
    required: [true, "Please enter job type."],
    enum: {
      values: ["Permanent", "Temporary", "Internship"],
      message: "Please select correct options for job type.",
    },
  },
  minEducation: {
    type: String,
    required: [true, "Please enter minimum education."],
    enum: {
      values: ["Bachelors", "Masters", "PhD"],
      message: "Please select correct options for education.",
    },
  },
  positions: {
    type: Number,
    required: [true, "Please enter number of positions."],
  },
  experience: {
    type: String,
    required: [true, "Please enter experience required for this job."],
    enum: {
      values: [
        "No Experience",
        "1 Year - 2 Years",
        "2 Years - 5 Years",
        "5 Years+",
      ],
      message: "Please select correct options for experience.",
    },
  },
  salary: {
    type: Number,
    required: [true, "Please enter expected salary for this job."],
  },
});

// Creating Job Slug before saving
jobSchema.pre("save", function (next) {
  this.slug = slugify(this.title, { lower: true });
  next();
});

// Setting up location
jobSchema.pre("save", async function (next) {
  const loc = await geoCoder.geocode(this.address);

  this.location = {
    type: "Point",
    coordinates: [loc[0].longitude, loc[0].latitude],
    formattedAddress: loc[0].formattedAddress,
    city: loc[0].city,
    state: loc[0].stateCode,
    zipcode: loc[0].zipcode,
    country: loc[0].countryCode,
  };
});

const Job = mongoose.model("Job", jobSchema);

module.exports = Job;
