import { useState } from "react"; // Importa o hook useState do React para gerenciar estados locais
import { Form, Modal } from "react-bootstrap"; // Importa componentes do React Bootstrap para formulário e modal
import Card from '@mui/material/Card'; 
// Importa o componente de cartão do Material-UI
import CardContent from '@mui/material/CardContent'; // Importa o componente de conteúdo de cartão do Material-UI
import CardActions from '@mui/material/CardActions'; // Importa o componente de ações de cartão do Material-UI
import Typography from '@mui/material/Typography'; // Importa o componente de tipografia do Material-UI
import Button from '@mui/material/Button'; // Importa o componente de botão do Material-UI
import Grid from '@mui/material/Grid'; // Importa o componente de grade do Material-UI
import { jsPDF } from 'jspdf'; // Importa a biblioteca jsPDF para geração de PDF
import { useForm } from "react-hook-form"; // Importa o hook useForm do React Hook Form para gerenciar o estado do formulário
import { DeleteConfirmationModal } from './Filtragem/DeleteConfirmationModal'; // Importa o componente modal de confirmação de exclusão
import { Input } from "./Input"; // Importa o componente de entrada de dados

export function Aluno(props) {
    // Hook useForm para gerenciar o estado do formulário
    const { handleSubmit, register, formState: { errors } } = useForm();
    
    // Estado local para controlar se o aluno foi atualizado
    const [isUpdated, setIsUpdated] = useState(false);

    
    // Estado local para controlar a exibição do modal de confirmação de exclusão
    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

    // Função para editar um aluno
    async function editAlunos(data) {
        await props.editAlunos({ ...data, id: props.alunos.id });
        setIsUpdated(false);
    }

    // Manipulador de evento para o clique no botão de exclusão
    const handleDeleteClick = () => {
        setShowDeleteConfirmation(true);
    };
    
    // Manipulador de evento para a confirmação da exclusão
    const handleConfirmDelete = () => {
        setShowDeleteConfirmation(false);
        props.removeAlunos();
    };

    // Função para gerar um PDF com informações do aluno
    const generatePDF = () => {
        const doc = new jsPDF();
        
        // Adicione os detalhes do aluno ao PDF
        doc.text('Gestão de Turmas', 80, 10);
        doc.text('Dados do Aluno', 10, 30);
        doc.text(`Nome: ${props.alunos.nomealunos}`, 10, 40);
        doc.text(`Turma: ${props.alunos.turma}`, 80, 40);
        doc.text(`Telefone: ${props.alunos.telefone}`, 10, 50);
        doc.text(`Data de Iniciação: ${props.alunos.dataIngressante}`, 80, 50);
        doc.text(`Turno: ${props.alunos.turno}`, 140, 40);
        doc.text(`Notas: ${props.alunos.notas}`, 90, 60);
        doc.text(`Disciplinas: ${props.alunos.disciplinas}`, 140, 90);
        
        // Salve o PDF com um nome específico
        doc.save(`aluno_${props.alunos.nomealunos}.pdf`);
    };

    return (
        <>
            <Card sx={{ mb: 3, p: 3, bgcolor: 'light' }}>
                <CardContent>
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <Typography variant="body1">
                                <strong>Nome:</strong> {props.alunos.nomealunos}
                            </Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant="body1">
                                <strong>Turma:</strong> {props.alunos.turma}
                            </Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant="body1">
                                <strong>Telefone:</strong> {props.alunos.telefone}
                            </Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant="body1">
                                <strong>Data de Ingresso:</strong> {props.alunos.dataIngressante}
                            </Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant="body1">
                                <strong>Turno:</strong> {props.alunos.turno}
                            </Typography>
                        </Grid>
                    </Grid>
                </CardContent>
                <CardActions>
                    <Grid container justifyContent="flex-end">
                        {/* Botão para baixar o PDF */}
                            <Grid item xs={0.30}></Grid>
                        <Button variant='outlined' color='success' onClick={generatePDF}>Baixar</Button>
                        <Grid item xs={0.30}></Grid>
                        {/* Botão para editar o aluno */}
                        <Button variant="outlined" onClick={() => setIsUpdated(true)}>
                            Editar
                        </Button>
                        <Grid item xs={0.30}></Grid>
                        {/* Botão para apagar o aluno */}
                        <Button
                            variant="outlined"
                            color="error"
                            onClick={handleDeleteClick}
                        >
                            Apagar
                        </Button>
                    </Grid>
                </CardActions>
            </Card>

            {/* Modal de edição do aluno */}
            <Modal show={isUpdated} onHide={() => setIsUpdated(false)} centered={true} className="centered-modal">
                <Modal.Header>
                    <Modal.Title>Editar Aluno: {props.alunos.nomealunos}</Modal.Title>
                </Modal.Header>
                <Form noValidate onSubmit={handleSubmit(editAlunos)} validated={!!errors}>
                    <Modal.Body>
                        {/* Componente de entrada de dados para o nome do aluno */}
                        <Input
                            className="mb-3"
                            type='text'
                            defaultValue={props.alunos.nomealunos}
                            label='Nome do Aluno'
                            placeholder='Insira o nome do aluno'
                            required={true}
                            name='nomealunos'
                            error={errors.nomealunos}
                            validations={register('nomealunos', {
                                required: {
                                    value: true,
                                    message: 'Nome do aluno é obrigatório.'
                                }
                            })}
                        />

                        {/* Componente de entrada de dados para o telefone */}
                        <Input
                            className="mb-3"
                            type='text'
                            defaultValue={props.alunos.telefone}
                            label='Telefone'
                            placeholder='Insira o número de telefone'
                            required={true}
                            name='telefone'
                            error={errors.telefone}
                            validations={register('telefone', {
                                required: {
                                    value: true,
                                    message: 'Número é obrigatório.'
                                }
                            })}
                        />
                        
                        {/* Componente de entrada de dados para a data de ingresso */}
                        <Input
                            className="mb-3"
                            type='date'
                            defaultValue={props.alunos.dataIngressante}
                            label='Data de Inicio'
                            placeholder='Insira a data de inicio no Colégio'
                            required={true}
                            name='dataIngressante'
                            error={errors.dataIngressante}
                            validations={register('dataIngressante', {
                                required: {
                                    value: true,
                                    message: 'Data de Ingresso é obrigatório.'
                                }
                            })}
                        />
                        
                        {/* Componente de seleção de turno */}
                        <Form.Group>
                            <Form.Label>Seleciona o Turno</Form.Label>
                            <Form.Select {...register('turno')} defaultValue={props.alunos.turno}>
                                <option disabled>Clique para selecionar</option>
                                <option value={'Matutino'}>Matutino</option>
                                <option value={'Vespertino'}>Vespertino</option>
                                <option value={'Noturno'}>Noturno</option>
                            </Form.Select>
                        </Form.Group>

                        {/* Componente de seleção de turma */}
                        <Form.Group>
                            <Form.Label>Seleciona a Turma</Form.Label>
                            <Form.Select {...register('turma')} defaultValue={props.alunos.turma} >
                                <option disabled>Clique para selecionar</option>
                                {/* Mapeia as turmas e cria uma opção para cada uma */}
                                {props.turmas.map((turma) => (
                                    <option key={turma.nometurmas} value={turma.nometurmas}>
                                        {turma.nometurmas}
                                    </option>
                                ))}
                            </Form.Select>
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        {/* Botão para confirmar a edição */}
                        <Button variant="primary" type="submit">
                            Editar
                        </Button>
                        {/* Botão para fechar o modal */}
                        <Button variant="secondary" onClick={() => setIsUpdated(false)}>
                            Fechar
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>

            {/* Modal de confirmação de exclusão */}
            <DeleteConfirmationModal
                show={showDeleteConfirmation}
                onHide={() => setShowDeleteConfirmation(false)}
                onConfirm={handleConfirmDelete}
            />
        </>
    );
}
