import formidable from "formidable";
import cloudinary from "cloudinary";

export const config = {
  api: { bodyParser: false }
};

cloudinary.v2.config({
  cloud_name: "dvrqzc92p",
  api_key: "483738912558981",
  api_secret: "eChMN8Z52UWjatwLFqE5x6k_f94"
});

export default async function handler(req, res) {
  const form = formidable();

  form.parse(req, async (err, fields, files) => {
    try {
      const result = await cloudinary.v2.uploader.upload(
        files.file.filepath,
        { resource_type: "video" }
      );

      res.status(200).json({ url: result.secure_url });
    } catch (e) {
      res.status(500).json({ error: "Upload failed" });
    }
  });
}