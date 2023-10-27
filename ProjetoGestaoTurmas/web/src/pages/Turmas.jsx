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
import { TurmaFilter } from "../components/Filtragem/Turmas.Filter";
import { Turma } from "../components/Turma";
import { Header } from "../components/Header";
import '../Style/Home.css'; // Importe um arquivo CSS para estilização

// Importações de funções de serviço para turmas
import { deleteTurmas, getTurma, updateTurmas } from "../services/turmas-service";

// Definição do componente 'Turmas'
export function Turmas() {
    // Estado para armazenar as turmas
    const [Turmas, setTurmas] = useState([]);
    
    // Estado para controlar a exibição do alerta
    const [isCreated, setIsCreated] = useState(false);
    
    // Estado para armazenar a mensagem do alerta
    const [alertMessage, setAlertMessage] = useState(null);
    
    // Navegação
    const navigate = useNavigate();

    // Função para filtrar turmas com base em um filtro
    const handleFilterTurmas = (filtro) => {
        findTurmas(filtro);
    };
    
    // Função para exibir um alerta
    const showAlert = (message, severity) => {
        setAlertMessage({ message, severity });
    };

    // Função para gerar um PDF com detalhes de uma turma
    const generatePDF = (turma) => {
        const doc = new jsPDF();
      
        doc.text('Detalhes da Turma:', 10, 10);
        doc.text(`Nome da Turma: ${turma.nometurmas}`, 10, 20);
        doc.text(`Turno: ${turma.ensino}`, 10, 30);
        doc.text(`Turno: ${turma.turno}`, 10, 40);
        doc.text(`Data de Início: ${turma.data_inicio}`, 10, 50);
        doc.text(`Data de Final: ${turma.data_final}`, 10, 60);
      
        doc.save('turma.pdf');
    };
      
    // Efeito para carregar as turmas ao montar o componente
    useEffect(() => {
        findTurmas();
        // eslint-disable-next-line
    }, []);

    // Função assíncrona para buscar turmas
    async function findTurmas(filters) {
        try {
            const result = await getTurma(filters);
            setTurmas(result.data);
        } catch (error) {
            console.error(error);
            navigate('/');
        }
    }

    // Função assíncrona para excluir uma turma
    async function removeTurmas(id) {
        try {
            await deleteTurmas(id);
            await findTurmas();
            showAlert('Turma excluída com sucesso', 'success'); // Exibe o alerta de sucesso
            setTimeout(() => {
                setAlertMessage(null);
            }, 5000);
        } catch (error) {
            console.error(error);
            showAlert('Ocorreu um erro ao excluir a turma', 'error'); // Exibe o alerta de erro
        }
    }

    // Função assíncrona para editar informações de uma turma
    async function editTurma(data) {
        try {
            await updateTurmas({
                id: data.id,
                nometurmas: data.nometurmas,
                ensino: data.ensino,
                turno: data.turno,
                cargaHoraria: data.cargaHoraria,
                data_inicio: data.data_inicio,
                data_final: data.data_final
            });
            await findTurmas();
            showAlert('Turma Editada com sucesso', 'success'); // Exibe o alerta de sucesso
            setTimeout(() => {
                setAlertMessage(null);
            }, 5000);
        } catch (error) {
            console.error(error);
            showAlert('Ocorreu um erro ao editar a turma', 'error'); // Exibe o alerta de erro
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
                <Header title="Cadastro de Turmas" />
                <Row className="w-50 m-auto mb-5 mt-5 ">
                    <Col md='10'>
                        <Link to='/turmas/formulario'>
                            <Button variant='contained' onClick={() => setIsCreated(true)} >Criar nova Turma</Button>
                        </Link>
                    </Col>
                </Row>
                <TurmaFilter onFilter={handleFilterTurmas} />
                <Col className="w-50 m-auto">
                    {Turmas && Turmas.length > 0
                        ? Turmas.map((turmas, index) => (
                            <Turma
                                key={index}
                                turmas={turmas}
                                removeTurmas={async () => await removeTurmas(turmas.id)}
                                editTurma={editTurma}
                                generatePDF={() => generatePDF(turmas)} 
                            />
                        ))
                        : <p className="text-center">Não existe nenhuma turma cadastrada!</p>}
                </Col>
                {/* Formulário dentro do Modal, ideal seria componentizar também, pois é parecido com o Modal de editar */}
                <Modal show={isCreated} onHide={() => setIsCreated(false)} centered={true} className="centered-modal">
                    <Modal.Header>
                        <Modal.Title>Cadastrar nova turma</Modal.Title>
                    </Modal.Header>
                </Modal>
            </Container>
        </div>
    );
}
