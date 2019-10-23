// Aqui ficará toda a parte de importação de upload de arquivos
import multer from 'multer';
import crypto from 'crypto';
import { extname, resolve } from 'path'; // extname extesão de arquivos, resolve é percorrer um caminho

export default {
  storage: multer.diskStorage({
    destination: resolve(__dirname, '..', '..', 'tmp', 'uploads'),
    // Como formatar o nome do arquivo
    filename: (req, file, cb) => {
      crypto.randomBytes(16, (err, res) => {
        // 16 caracteres
        if (err) return cb(err);
        return cb(null, res.toString('hex') + extname(file.originalname));
      });
    },
  }),
};
