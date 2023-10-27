import { useState } from "react"; // Importa o hook useState do React para gerenciar estados locais
import { Form, Modal } from "react-bootstrap"; // Importa componentes do React Bootstrap para formulário e modal
import { useForm } from "react-hook-form"; // Importa o hook useForm do React Hook Form para gerenciar o estado do formulário
import Card from '@mui/material/Card'; // Importa o componente de cartão do Material-UI
import CardContent from '@mui/material/CardContent'; // Importa o componente de conteúdo de cartão do Material-UI
import CardActions from '@mui/material/CardActions'; // Importa o componente de ações de cartão do Material-UI
import Typography from '@mui/material/Typography'; // Importa o componente de tipografia do Material-UI
import Button from '@mui/material/Button'; // Importa o componente de botão do Material-UI
import Grid from '@mui/material/Grid'; // Importa o componente de grade do Material-UI
import { jsPDF } from 'jspdf'; // Importa o jsPDF para geração de PDF
import 'jspdf-autotable'; // Importa a extensão jspdf-autotable para tabelas no PDF
import { getAlunos } from "../services/alunos-service"; // Importa a função para obter alunos do serviço de alunos
import { DeleteConfirmationModal } from './Filtragem/DeleteConfirmationModal'; // Importa o componente modal de confirmação de exclusão
import { Input } from "./Input"; // Importa o componente de entrada de dados

export function Turma(props) {
    // Hook useForm para gerenciar o estado do formulário
    const { handleSubmit, register, formState: { errors } } = useForm();
    
    // Estado local para controlar se a turma foi atualizada
    const [isUpdated, setIsUpdated] = useState(false);
    
    // Estado local para controlar a exibição do modal de confirmação de exclusão
    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

    // Função para gerar um PDF com informações da turma e alunos
    const generatePDF = async () => {
        try {
            console.log('Nome da Turma:', props.turmas.nometurmas);

            // Filtra alunos por turma
            const filtroPorTurma = { turma: props.turmas.nometurmas };
            const response = await getAlunos(filtroPorTurma);

            console.log('Resposta da API:', response);

            if (response.data && Array.isArray(response.data)) {
                const alunosMatriculados = response.data;

                const doc = new jsPDF();

                // Adiciona informações da turma no PDF
                doc.text('Gestão de Turmas', 80, 10);
                doc.text(`Nome da Turma: ${props.turmas.nometurmas}`, 10, 20);
                doc.text(`Ensino: ${props.turmas.ensino}`, 90, 20);
                doc.text(`Carga Horaria: ${props.turmas.cargaHoraria}`, 140, 20);
                doc.text(`Data de Início: ${props.turmas.data_inicio}`, 10, 30);
                doc.text(`Data de Término: ${props.turmas.data_final}`, 90, 30);
                doc.text('Alunos Matriculados', 80, 50);
                
                // Adiciona os detalhes dos alunos matriculados em uma tabela
                const tableData = alunosMatriculados.map((aluno) => [
                    aluno.id,
                    aluno.nomealunos,
                ]);

                doc.autoTable({
                    head: [['Matrícula', 'Nome']],
                    body: tableData,
                    startY: 60, // Posição inicial da tabela
                });

                doc.save(`turma_${props.turmas.nometurmas}.pdf`);
            } else {
                console.error('Resposta inválida da função getAlunos');
            }
        } catch (error) {
            console.error(error);
        }
    };

    // Função para editar a turma
    async function editTurma(data) {
        await props.editTurma({ ...data, id: props.turmas.id });
        setIsUpdated(false);
    }

    // Manipulador de evento para o clique no botão de exclusão
    const handleDeleteClick = () => {
        setShowDeleteConfirmation(true);
    };
    
    // Manipulador de evento para a confirmação da exclusão
    const handleConfirmDelete = () => {
        setShowDeleteConfirmation(false);
        props.removeTurmas();
    };

    return (
        <>
          <Card sx={{ mb: 3, p: 3, bgcolor: 'light' }}>
            <CardContent>
                <Grid container spacing={2}>
                <Grid item xs={6}>
                    <Typography variant="body1">
                    <strong>Turma:</strong> {props.turmas.nometurmas}
                    </Typography>
                </Grid>
                <Grid item xs={6}>
                    <Typography variant="body1">
                    <strong>Ensino:</strong> {props.turmas.ensino}
                    </Typography>
                </Grid>
                <Grid item xs={6}>
                    <Typography variant="body1">
                    <strong>Carga Horaria:</strong> {props.turmas.cargaHoraria}
                    </Typography>
                </Grid>
                <Grid item xs={6}>
                    <Typography variant="body1">
                    <strong>Data de Inicio:</strong> {props.turmas.data_inicio}
                    </Typography>
                </Grid>
                <Grid item xs={6}>
                    <Typography variant="body1">
                    <strong>Data Final:</strong> {props.turmas.data_final}
                    </Typography>
                </Grid>
                <Grid item xs={6}>
                    <Typography variant="body1">
                    <strong>Turno:</strong> {props.turmas.turno}
                    </Typography>
                </Grid>
                </Grid>
            </CardContent>
            <CardActions>
              <Grid container justifyContent="flex-end">
                {/* Botão para baixar o PDF */}
                <Button variant='outlined' color='success' onClick={generatePDF}>Baixar</Button>
                <Grid item xs={0.30}></Grid>
                {/* Botão para editar a turma */}
                <Button variant="outlined" onClick={() => setIsUpdated(true)}>
                  Editar
                </Button>
                <Grid item xs={0.30}></Grid>
                {/* Botão para apagar a turma */}
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
            {/* Modal para editar a turma */}
            <Modal show={isUpdated} onHide={() => setIsUpdated(false)} centered={true} className="centered-modal">
                <Modal.Header>
                    <Modal.Title>Editar Turma: {props.turmas.nometurmas}</Modal.Title>
                </Modal.Header>
                <Form noValidate onSubmit={handleSubmit(editTurma)} validated={!!errors}>
                <Modal.Body>
                        {/* Componente de entrada de dados para o nome da turma */}
                        <Input
                            className="mb-3"
                            type='text'
                            defaultValue={props.turmas.nometurmas}
                            label='Nome da Turma'
                            placeholder='Insira o nome da turma'
                            required={true}
                            name='nometurmas'
                            error={errors.nometurmas}
                            validations={register('nometurmas', {
                                required: {
                                    value: true,
                                    message: 'Nome da turma é obrigatório.'
                                }
                            })}
                        />
                        {/* Componente de entrada de dados para o tipo de ensino */}
                        <Input
                            className="mb-3"
                            type='text'
                            defaultValue={props.turmas.ensino}
                            label='Tipo de Ensino'
                            placeholder='Insira o ensino'
                            required={true}
                            name='ensino'
                            error={errors.ensino}
                            validations={register('ensino', {
                                required: {
                                    value: true,
                                    message: 'O tipo de ensino é obrigatório.'
                                }
                            })}
                        />
                        {/* Componente de entrada de dados para a carga horária */}
                        <Input
                            className="mb-3"
                            type='text'
                            defaultValue={props.turmas.cargaHoraria}
                            label='Carga Horária'
                            placeholder='Insira a carga Horária'
                            required={true}
                            name='cargaHoraria'
                            error={errors.cargaHoraria}
                            validations={register('cargaHoraria', {
                                required: {
                                    value: true,
                                    message: 'Carga Horária é obrigatório.'
                                }
                            })}
                        />
                        {/* Componente de entrada de dados para a data de início */}
                        <Input
                            className="mb-3"
                            type='date'
                            defaultValue={props.turmas.data_inicio}
                            label='Data Inicio'
                            placeholder='Insira a data de inicio '
                            required={true}
                            name='data_inicio'
                            error={errors.data_inicio}
                            validations={register('data_inicio', {
                                required: {
                                    value: true,
                                    message: 'Data final é obrigatório.'
                                }
                            })}
                        />
                        {/* Componente de entrada de dados para a data final */}
                        <Input
                            className="mb-3"
                            type='date'
                            defaultValue={props.turmas.data_final}
                            label='Data Final'
                            placeholder='Insira a data de finalização'
                            required={true}
                            name='data_final'
                            error={errors.data_final}
                            validations={register('data_final', {
                                required: {
                                    value: true,
                                    message: 'Data inicio é obrigatório.'
                                }
                            })}
                        />
                        {/* Componente de seleção de turno */}
                        <Form.Group>
                            <Form.Label>Seleciona o Turno</Form.Label>
                            <Form.Select {...register('turno')} defaultValue={props.turmas.turno}>
                                <option disabled>Clique para selecionar</option>
                                <option value={'Matutino'}>Matutino</option>
                                <option value={'Vespertino'}>Vespertino</option>
                                <option value={'Noturno'}>Noturno</option>
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
