import { Container, Col, Modal, Row } from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

import { SideBar } from '../components/Sidebar/Sidebar';
import { AlunosFilter } from "../components/Filtragem/Alunos.Filters";
import { Aluno } from "../components/Aluno";
import { Header } from "../components/Header";
import '../Style/Home.css';

import { deleteAlunos, getAlunos, getTurmas, updateAlunos } from "../services/alunos-service";

export function Alunos() {
    // Estado para armazenar a lista de alunos
    const [Alunos, setAlunos] = useState([]);
    
    // Estado para controlar se um aluno foi criado
    const [isCreated, setIsCreated] = useState(false);
    
    // Estado para exibir mensagens de alerta
    const [alertMessage, setAlertMessage] = useState(null);
    
    // Função para navegar entre as páginas
    const navigate = useNavigate();
    
    // Estado para armazenar a lista de turmas
    const [turmas, setTurmas] = useState([]);

    // Função para filtrar alunos
    const handleFilterAlunos = (filtro) => {
        findAlunos(filtro);
    };

    // Função para exibir um alerta de sucesso ou erro
    const showAlert = (message, severity) => {
        setAlertMessage({ message, severity });
    };

    // Efeito para buscar as turmas ao carregar o componente
    useEffect(() => {
        fetchTurmas();
        // eslint-disable-next-line 
    }, []);

    // Efeito para buscar os alunos ao carregar o componente
    useEffect(() => {
        findAlunos();
        // eslint-disable-next-line 
    }, []);

    // Função para buscar a lista de turmas
    async function fetchTurmas() {
        try {
            const result = await getTurmas();
            setTurmas(result.data);
        } catch (error) {
            console.error(error);
            navigate('/');
        }
    }

    // Função para buscar a lista de alunos
    async function findAlunos(filters) {
        try {
            const result = await getAlunos(filters);
            setAlunos(result.data);
        } catch (error) {
            console.error(error);
            navigate('/');
        }
    }

    // Função para remover um aluno
    async function removeAlunos(id) {
        try {
            await deleteAlunos(id);
            await findAlunos();
            showAlert('Aluno removido com sucesso', 'success');
            setTimeout(() => {
                setAlertMessage(null);
            }, 5000);
        } catch (error) {
            console.error(error);
            showAlert('Ocorreu um erro ao excluir o aluno', 'error');
        }
    }

    // Função para editar um aluno
    async function editAlunos(data) {
        try {
            await updateAlunos({
                id: data.id,
                nomealunos: data.nomealunos, 
                turma: data.turma, 
                turno: data.turno, 
                telefone: data.telefone, 
                dataIngressante: data.dataIngressante,
                notas: data.notas,
                disciplinas: data.disciplinas
            });
            await findAlunos();
            showAlert('Aluno Editado com sucesso', 'success');
            setTimeout(() => {
                setAlertMessage(null);
            }, 5000);
        } catch (error) {
            console.error(error);
            showAlert('Ocorreu um erro ao editar o aluno', 'error');
        }
    }

    return (
        <div className='container-margin'>
            <SideBar/>
            {alertMessage && (
                <Stack sx={{ width: '100%' }} spacing={2}>
                    <Alert severity={alertMessage.severity}>{alertMessage.message}</Alert>
                </Stack>
            )}
            <Container fluid>
                <Header title="Cadastro de Alunos" />
                <Row className="w-50 m-auto mb-5 mt-5 ">
                    <Col md='10'>
                        {/* Link para a página de formulário de matrícula de aluno */}
                        <Link to='/alunos/formulario'>
                            <Button variant='contained'  onClick={() => setIsCreated(true)} className="button-matricular">Matricular Aluno</Button>
                        </Link>
                    </Col>
                </Row>
                <AlunosFilter onFilter={handleFilterAlunos} />
                <Col className="w-50 m-auto">
                    {Alunos && Alunos.length > 0
                        ? Alunos.map((alunos, index) => (
                            <Aluno
                                key={index}
                                alunos={alunos}
                                turmas={turmas}
                                // Função para remover um aluno
                                removeAlunos={async () => await removeAlunos(alunos.id)}
                                // Função para editar um aluno
                                editAlunos={editAlunos}
                            />
                        ))
                        : <p className="text-center">Não existe nenhum Aluno Matriculado!</p>}
                </Col>
                {/* Formulário dentro do Modal, ideal seria componentizar também, pois é parecido com o Modal de editar */}
                <Modal show={isCreated} onHide={() => setIsCreated(false)} centered={true}
                className="centered-modal">
                    <Modal.Header>
                        <Modal.Title>Matricular Novo Aluno</Modal.Title>
                    </Modal.Header>
                </Modal>
            </Container>
        </div>
    );
}
