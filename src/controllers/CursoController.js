const Curso = require('../models/Curso'); // Importe o modelo de Curso

class CursoController {
    // Método para criar curso
    async create(req, res) {
        const { nome, duracao_horas } = req.body;
        try {
            if (!nome) {
                return res.status(400).json({ message: "O nome é obrigatório" });
            }
            if (!(duracao_horas >= 40 && duracao_horas <= 200)) {
                return res.status(400).json({
                    message: "A duração do curso deve ser entre 40 e 200 horas"
                });
            }
            const curso = await Curso.create({ nome, duracao_horas });
            res.status(201).json(curso);
        } catch (error) {
            console.log(error.message);
            res.status(500).json({ error: 'Não possível cadastrar o curso' });
        }
    }

    // Método para listar cursos
    async list(req, res) {
        let params = {};
        if (req.query.nome) {
            params = { ...params, nome: req.query.nome };
        }
        if (req.query.duracao_horas) {
            params = { ...params, duracao_horas: req.query.duracao_horas };
        }
        try {
            const cursos = await Curso.findAll({ where: params });
            res.json(cursos);
        } catch (error) {
            console.log(error.message);
            res.status(500).json({ error: 'Não possível listar todos os cursos' });
        }
    }

}