const { z } = require("zod");

const applicationSchema = z.object({
  company: z.string().trim().min(1, "Company is required."),
  position: z.string().trim().min(1, "Position is required."),
  location: z.string().trim().optional().default(""),
  jobType: z.enum(["Full Time", "Part Time", "Internship", "Contract", "Remote"]).optional(),
  status: z.enum(["Applied", "Interview", "Rejected", "Offer", "Withdrawn"]).optional(),
  appliedDate: z.string().trim().min(1).optional(),
  jobUrl: z.string().trim().url("Job URL must be a valid URL.").or(z.literal("")).optional(),
  salary: z.string().trim().optional().default(""),
  notes: z.string().trim().optional().default("")
});

module.exports = { applicationSchema };
