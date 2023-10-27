// Importações de bibliotecas e componentes React
import { Container, Col, Form } from "react-bootstrap";
import { useState } from "react";
import { useForm } from 'react-hook-form';
import { useNavigate } from "react-router-dom";
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';

// Importações de componentes personalizados
import { SideBar } from '../Sidebar/Sidebar';
import { Header } from "../Header";
import { Input } from '../Input';
import '../../Style/Home.css'; // Importe um arquivo CSS para estilização

// Importação da função de serviço para criar turmas
import { createDisciplina } from "../../services/disciplina-service";

// Definição do componente 'FormularioDisciplina'
export function FormularioDisciplina() {
    // Inicialização dos estados e hooks
    const { handleSubmit, register, formState: { errors }, reset } = useForm();
    const [alertMessage, setAlertMessage] = useState(null);
    const navigate = useNavigate();

    // Função para exibir alertas
    const showAlert = (message, severity) => {
        setAlertMessage({ message, severity });
    };

    // Função para adicionar uma turma
    async function addDisciplina(data) {
        try {
            await createDisciplina(data);
            reset(); // Limpa o formulário após a submissão
            showAlert('Disciplina Cadastrada com sucesso', 'success'); // Exibe o alerta de sucesso
            setTimeout(() => {
                setAlertMessage(null);
            }, 5000);
        } catch (error) {
            console.error(error);
            showAlert('Ocorreu um erro ao cadastrar a Disciplina', 'error'); // Exibe o alerta de erro
        }
    }

    // Renderização do componente
    return (
        <div className='container-margin'>
            <SideBar /> {/* Renderização da barra lateral */}
            {alertMessage && (
                <Stack sx={{ width: '100%' }} spacing={2}>
                    <Alert severity={alertMessage.severity}>{alertMessage.message}</Alert>
                </Stack>
            )}
            <Container fluid>
                <Header title="Formulário de Disciplina" />

                <Col className="w-50 m-auto mt-4"> {/* Adicionei a margem superior aqui */}
                    {/* Formulário de cadastro de turma */}
                    <Form noValidate onSubmit={handleSubmit(addDisciplina)} validated={!!errors}>
                        <Input
                            className="mb-3"
                            type='text'
                            label='Nome da Disciplina'
                            placeholder='Insira o nome da disciplina'
                            required={true}
                            name='nomedisciplina'
                            error={errors.nomedisciplina}
                            validations={register('nomedisciplina', {
                                required: {
                                    value: true,
                                    message: 'Nome da disciplina é obrigatório.'
                                }
                            })}
                        />
                        <Input
                            className="mb-3"
                            type='text'
                            label='Professor'
                            placeholder='Insira o professor'
                            required={true}
                            name='professor'
                            error={errors.professor}
                            validations={register('professor', {
                                required: {
                                    value: true,
                                    message: 'O nome do professor é obrigatório.'
                                }
                            })}
                        />

                        <Input
                            className="mb-3"
                            type='text'
                            label='Quantidade de Aulas'
                            placeholder='Insira as aulas'
                            required={true}
                            name='qtde_aulas'
                            error={errors.qtde_aulas}
                            validations={register('qtde_aulas', {
                                required: {
                                    value: true,
                                    message: 'Quantidade de aulas é obrigatória.'
                                }
                            })}
                        />
                       
                        <Grid container justifyContent="flex-end">
                            <Button className="mt-3 mb-3" variant='contained' color='success' type="submit"> {/* Adicionei a margem superior aqui */}
                                Confirmar Cadastro
                            </Button>
                            <Grid item xs={0.30}></Grid>
                            <Button className="mt-3 mb-3" variant="contained" color='error' onClick={() => navigate('/disciplinas')}>
                                Cancelar
                            </Button>
                        </Grid>
                    </Form>
                </Col>
            </Container>
        </div>
    );
}
