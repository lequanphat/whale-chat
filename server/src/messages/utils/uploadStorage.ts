import { diskStorage } from 'multer';
export const uploadStorage = (dir: string) => {
  return {
    storage: diskStorage({
      destination: `./public/uploads/${dir}/`, // directory
      filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null, `${uniqueSuffix}-${file.originalname}`);
        // next
        req.fileName = `${uniqueSuffix}-${file.originalname}`;
        req.originalName = file.originalname;
      },
    }),
  };
};
