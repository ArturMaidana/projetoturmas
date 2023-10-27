const { Router, request } = require('express');

const { UserController } = require('./controllers/Usuarios-Controller');
const { TurmasController } = require('./controllers/Turmas-Controller');
const { AlunosController } = require('./controllers/Alunos Controller');
const { DisciplinaController } = require('./controllers/Disciplina-Controller');
const { authMiddleware } = require('./middleware/auth-middleware');


const routes = Router();
 
const usercontroller = new UserController();
const turmascontroller = new TurmasController();
const alunoscontroller = new AlunosController();
const disciplinacontroller = new DisciplinaController();


//Rotas de turmas
routes.post('/turma', authMiddleware, turmascontroller.create);
routes.get('/turmas', authMiddleware, turmascontroller.getAll);
routes.delete('/turmas/:id', authMiddleware, turmascontroller.delete);
routes.put('/turmas/:id', authMiddleware, turmascontroller.update);

//Rotas de turmas
routes.post('/disciplina', authMiddleware, disciplinacontroller.create);
routes.get('/disciplinas', authMiddleware, disciplinacontroller.getAll);
routes.delete('/disciplinas/:id', authMiddleware, disciplinacontroller.delete);
routes.put('/disciplinas/:id', authMiddleware, disciplinacontroller.update);


//Rotas de Alunos
routes.post('/aluno', authMiddleware, alunoscontroller.create);
routes.get('/alunos', authMiddleware, alunoscontroller.getAll);
routes.delete('/alunos/:id', authMiddleware, alunoscontroller.delete);
routes.put('/alunos/:id', authMiddleware, alunoscontroller.update);

//Rotas de Usuario
routes.get('/users', authMiddleware, usercontroller.getAll);
routes.delete('/user/:id',authMiddleware, usercontroller.delete);
routes.put('/user/:id', authMiddleware, usercontroller.update);
routes.post('/register', usercontroller.register);
routes.post('/login', usercontroller.login);

module.exports = { routes };
