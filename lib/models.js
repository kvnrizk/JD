import mongoose from "mongoose";

const toJSON = {
  virtuals: true,
  transform: (_, ret) => {
    ret.id = ret._id?.toString();
    delete ret._id;
    delete ret.__v;
    return ret;
  },
};

const ClinicSchema = new mongoose.Schema(
  { name: String, city: String, address: String, phone: String, doctolib_url: String, map_url: String, order: { type: Number, default: 0 } },
  { toJSON }
);

const ResultSchema = new mongoose.Schema(
  { patient_label: String, treatment_type: String, before_url: String, after_url: String, date: String, order: { type: Number, default: 0 } },
  { toJSON }
);

const InstagramSchema = new mongoose.Schema(
  { image_url: String, caption: String, link: { type: String, default: "#" }, order: { type: Number, default: 0 } },
  { toJSON }
);

const UserSchema = new mongoose.Schema(
  { email: { type: String, unique: true }, password_hash: String, name: String, role: String },
  { toJSON }
);

export const Clinic    = mongoose.models.Clinic    || mongoose.model("Clinic",    ClinicSchema);
export const Result    = mongoose.models.Result    || mongoose.model("Result",    ResultSchema);
export const Instagram = mongoose.models.Instagram || mongoose.model("Instagram", InstagramSchema);
export const User      = mongoose.models.User      || mongoose.model("User",      UserSchema);
