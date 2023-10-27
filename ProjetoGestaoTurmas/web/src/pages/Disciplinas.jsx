// Importações de bibliotecas e componentes
import { Container, Col, Modal, Row } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { jsPDF } from 'jspdf';

// Importações de componentes personalizados
import { SideBar } from '../components/Sidebar/Sidebar';
import { DisciplinaFilter } from "../components/Filtragem/Disciplina.FIlter";
import { Disciplina } from "../components/Disciplina";
import { Header } from "../components/Header";
import '../Style/Home.css'; // Importe um arquivo CSS para estilização

// Importações de funções de serviço para Disciplinas
import {  getDisciplina, updateDisciplina, deleteDisciplina} from "../services/disciplina-service";

// Definição do componente 'Disciplinas'
export function Disciplinas() {
    // Estado para armazenar as Disciplinas
    const [Disciplinas, setDisciplinas] = useState([]);
    
    // Estado para controlar a exibição do alerta
    const [isCreated, setIsCreated] = useState(false);
    
    // Estado para armazenar a mensagem do alerta
    const [alertMessage, setAlertMessage] = useState(null);
    
    // Navegação
    const navigate = useNavigate();

    // Função para filtrar Disciplinas com base em um filtro
    const handleFilterDisciplinas = (filtro) => {
        findDisciplinas(filtro);
    };
    
    // Função para exibir um alerta
    const showAlert = (message, severity) => {
        setAlertMessage({ message, severity });
    };

    // Função para gerar um PDF com detalhes de uma Disciplina
    const generatePDF = (Disciplina) => {
        const doc = new jsPDF();
      
        doc.text('Detalhes da Disciplina:', 10, 10);
        doc.text(`Nome da Disciplina: ${Disciplina.nomedisciplina}`, 10, 20);
    
        doc.save('Disciplina.pdf');
    };
      
    // Efeito para carregar as Disciplinas ao montar o componente
    useEffect(() => {
        findDisciplinas();
        // eslint-disable-next-line
    }, []);

    // Função assíncrona para buscar Disciplinas
    async function findDisciplinas(filters) {
        try {
            const result = await getDisciplina(filters);
            setDisciplinas(result.data);
        } catch (error) {
            console.error(error);
            navigate('/');
        }
    }

    // Função assíncrona para excluir uma Disciplina
    async function removeDisciplinas(id) {
        try {
            await deleteDisciplina(id);
            await findDisciplinas();
            showAlert('Disciplina excluída com sucesso', 'success'); // Exibe o alerta de sucesso
            setTimeout(() => {
                setAlertMessage(null);
            }, 5000);
        } catch (error) {
            console.error(error);
            showAlert('Ocorreu um erro ao excluir a Disciplina', 'error'); // Exibe o alerta de erro
        }
    }

    // Função assíncrona para editar informações de uma Disciplina
    async function editDisciplina(data) {
        try {
            await updateDisciplina({
                id: data.id,
                nomedisciplina: data.nomedisciplina, 
                qtde_aulas: data.qtde_aulas, 
                professor: data.professor,
            });
            await findDisciplinas();
            showAlert('Disciplina Editada com sucesso', 'success'); // Exibe o alerta de sucesso
            setTimeout(() => {
                setAlertMessage(null);
            }, 5000);
        } catch (error) {
            console.error(error);
            showAlert('Ocorreu um erro ao editar a Disciplina', 'error'); // Exibe o alerta de erro
        }
    }

    // Renderização do componente
    return (
        <div className='container-margin'>
            <SideBar />
            {alertMessage && (
                <Stack sx={{ width: '100%' }} spacing={2}>
                    <Alert severity={alertMessage.severity}>{alertMessage.message}</Alert>
                </Stack>
            )}
            <Container fluid>
                <Header title="Cadastro de Disciplinas" />
                <Row className="w-50 m-auto mb-5 mt-5 ">
                    <Col md='10'>
                        <Link to='/disciplinas/formulario'>
                            <Button variant='contained' onClick={() => setIsCreated(true)} >Criar nova Disciplina</Button>
                        </Link>
                    </Col>
                </Row>
                <DisciplinaFilter onFilter={handleFilterDisciplinas} />
                <Col className="w-50 m-auto">
                    {Disciplinas && Disciplinas.length > 0
                        ? Disciplinas.map((Disciplinas, index) => (
                            <Disciplina
                                key={index}
                                disciplinas={Disciplinas}
                                removeDisciplinas={async () => await removeDisciplinas(Disciplinas.id)}
                                editDisciplina={editDisciplina}
                                generatePDF={() => generatePDF(Disciplinas)} 
                            />
                        ))
                        : <p className="text-center">Não existe nenhuma Disciplina cadastrada!</p>}
                </Col>
                {/* Formulário dentro do Modal, ideal seria componentizar também, pois é parecido com o Modal de editar */}
                <Modal show={isCreated} onHide={() => setIsCreated(false)} centered={true} className="centered-modal">
                    <Modal.Header>
                        <Modal.Title>Cadastrar nova Disciplina</Modal.Title>
                    </Modal.Header>
                </Modal>
            </Container>
        </div>
    );
}
